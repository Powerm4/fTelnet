// TODOX Maybe simplify to use something like socketOverWebsocket so there's no window.cordova checks in here and Socket -> WebSocket stuff in the socketOverWebSocket file
/*
  fTelnet: An HTML5 WebSocket client
  Copyright (C) Rick Parrish, R&M Software

  This file is part of fTelnet.

  fTelnet is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or any later version.

  fTelnet is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with fTelnet.  If not, see <http://www.gnu.org/licenses/>.
*/

// The cordova socket library does not support universal windows apps (not yet anyway!) so detect and disable for those
var UseCordovaSocket = (!!window.cordova && !navigator.userAgent.match(/iemobile/i) && !navigator.userAgent.match(/MSAppHost/i));

// Detect if a WebSocket workaround is required
if (!UseCordovaSocket) {
    if (('WebSocket' in window) && !navigator.userAgent.match('AppleWebKit/534.30')) {
        // Do nothing, we have native websocket support
    } else if ('MozWebSocket' in window) {
        // For Firefox 6.0
        window['WebSocket'] = window['MozWebSocket'];
    } else {
        // For IE9 and Android < 4.4
        // From: https://github.com/gimite/web-socket-js
        window['WEB_SOCKET_FORCE_FLASH'] = true;
        window['WEB_SOCKET_SWF_LOCATION'] = StringUtils.GetUrl('WebSocketMain.swf');
        document.write('<script src="' + StringUtils.GetUrl('swfobject.js') + '"><\/script>');
        document.write('<script src="' + StringUtils.GetUrl('web_socket.js') + '"><\/script>');
    }
}

var WebSocketProtocol: string = (document.location.protocol === 'https:' ? 'wss' : 'ws');
var WebSocketSupportsTypedArrays: boolean = (('Uint8Array' in window) && ('set' in Uint8Array.prototype));
var WebSocketSupportsBinaryType: boolean = false;
if (!UseCordovaSocket) {
    WebSocketSupportsBinaryType = (WebSocketSupportsTypedArrays && ('binaryType' in WebSocket.prototype || !!(new WebSocket(WebSocketProtocol + '://.').binaryType)));
}

class WebSocketConnection {
    // Events
    public onclose: IEvent = new TypedEvent();
    public onconnect: IEvent = new TypedEvent();
    public ondata: IEvent = new TypedEvent();
    public onlocalecho: IEvent = new TypedEvent();
    public onioerror: IEvent = new TypedEvent();
    public onsecurityerror: IEvent = new TypedEvent();

    // Private variables
    private _WasConnected: boolean = false;

    // TODO Protected variables
    public _InputBuffer: ByteArray;
    public _LocalEcho: boolean = false;
    public _LogIO: boolean = (window.location.hash.indexOf('ftelnetdebug=1') >= 0);
    public _OutputBuffer: ByteArray;
    public _Protocol: string = 'plain';
    public _SendLocation: boolean = true;
    public _WebSocket: WebSocket;
    public _CordovaSocket: Socket;

    constructor() {
        this._InputBuffer = new ByteArray();
        this._OutputBuffer = new ByteArray();
    }

    public get bytesAvailable(): number {
        return this._InputBuffer.bytesAvailable;
    }

    public close(): void {
        if (UseCordovaSocket) {
            if (this._CordovaSocket) {
                this._CordovaSocket.close();
            }
        } else {
            if (this._WebSocket) {
                this._WebSocket.close();
            }
        }
    }

    public connect(hostname: string, port: number, urlPath: string, forceWss: boolean, proxyHostname?: string, proxyPort?: number, proxyPortSecure?: number): void {
        if (typeof proxyHostname === 'undefined') { proxyHostname = ''; }
        if (typeof proxyPort === 'undefined') { proxyPort = 80; }
        if (typeof proxyPortSecure === 'undefined') { proxyPortSecure = 443; }

        // TODOX Cordova socket does not support windows universal yet, so force proxy on iemobile
        if (!!window.cordova && !UseCordovaSocket) {
            proxyHostname = 'proxy-us-nj.ftelnet.ca';
            proxyPort = 80;
            proxyPortSecure = 443;
        }

        this._WasConnected = false;

        if (UseCordovaSocket) {
            this._CordovaSocket = new Socket();
            this._CordovaSocket.open(
                hostname,
                port,
                (): void => { this.OnSocketOpen(); },
                (message: string): void => { 
                    var e = new ErrorEvent('Socket', {
                        bubbles: true,
                        cancelable: true,
                        message: message
                    }); 
                    this.OnSocketError(e); 
                }
            );

            // Set event handlers
            this._CordovaSocket.onClose = (): void => { this.OnSocketClose(); };
            this._CordovaSocket.onData = (data: Uint8Array): void => { this.OnCordovaSocketData(data); };
            this._CordovaSocket.onError = (message: string): void => { 
                var e = new ErrorEvent('Socket', {
                    bubbles: true,
                    cancelable: false,
                    message: message
                }); 
                this.OnSocketError(e); 
            };
        } else {
            var Protocols: string[];
            if (('WebSocket' in window) && (WebSocket.CLOSED === 2 || WebSocket.prototype.CLOSED === 2)) { // From: http://stackoverflow.com/a/17850524/342378
                // This is likely a hixie client, which doesn't support negotiation fo multiple protocols, so we only ask for plain
                Protocols = ['plain'];
            } else {
                if (WebSocketSupportsBinaryType && WebSocketSupportsTypedArrays) {
                    Protocols = ['binary', 'base64', 'plain'];
                } else {
                    console.log('WebSocketSupportsBinaryType=' + WebSocketSupportsBinaryType);
                    console.log('WebSocketSupportsTypedArrays=' + WebSocketSupportsTypedArrays);
                    Protocols = ['base64', 'plain'];
                }
            }

            var WsOrWss = forceWss ? 'wss' : WebSocketProtocol;
            if (proxyHostname === '') {
                this._WebSocket = new WebSocket(WsOrWss + '://' + hostname + ':' + port + urlPath, Protocols);
            } else {
                this._WebSocket = new WebSocket(WsOrWss + '://' + proxyHostname + ':' + (WsOrWss === 'wss' ? proxyPortSecure : proxyPort) + '/' + hostname + '/' + port, Protocols);
            }

            // Enable binary mode, if supported
            if (Protocols.indexOf('binary') >= 0) {
                this._WebSocket.binaryType = 'arraybuffer';
            }

            // Set event handlers
            this._WebSocket.onclose = (): void => { this.OnSocketClose(); };
            this._WebSocket.onerror = (e: ErrorEvent): void => { this.OnSocketError(e); };
            this._WebSocket.onmessage = (e: any): void => { this.OnWebSocketMessage(e); };
            this._WebSocket.onopen = (): void => { this.OnSocketOpen(); };
        }
    }

    public get connected(): boolean {
        if (UseCordovaSocket) {
            if (this._CordovaSocket) {
                return (this._CordovaSocket.state === Socket.State.OPENED);
            }
        } else {
            if (this._WebSocket) {
                return (this._WebSocket.readyState === this._WebSocket.OPEN) || (this._WebSocket.readyState === WebSocket.OPEN);
            }
        }

        return false;
    }

    public flush(): void {
        var ToSendBytes: number[] = [];

        this._OutputBuffer.position = 0;
        while (this._OutputBuffer.bytesAvailable > 0) {
            var B: number = this._OutputBuffer.readUnsignedByte();
            ToSendBytes.push(B);
        }

        this.Send(ToSendBytes);
        this._OutputBuffer.clear();
    }

    public set LocalEcho(value: boolean) {
        this._LocalEcho = value;
    }

    public NegotiateInbound(data: ByteArray): void {
        // No negotiation for raw tcp connection
        while (data.bytesAvailable) {
            var B: number = data.readUnsignedByte();
            this._InputBuffer.writeByte(B);
        }
    }

    private OnCordovaSocketData(data: Uint8Array): void {
        // Free up some memory if we're at the end of the buffer
        if (this._InputBuffer.bytesAvailable === 0) { this._InputBuffer.clear(); }

        // Save the old position and set the new position to the end of the buffer
        var OldPosition: number = this._InputBuffer.position;
        this._InputBuffer.position = this._InputBuffer.length;

        var Data: ByteArray = new ByteArray();

        // Write the incoming message to the input buffer
        var i: number;
        for (i = 0; i < data.length; i++) {
            Data.writeByte(data[i]);
        }
        Data.position = 0;

        this.NegotiateInbound(Data);

        // Restore the old buffer position
        this._InputBuffer.position = OldPosition;

        // Raise ondata event
        this.ondata.trigger();
    }

    private OnSocketClose(): void {
        if (this._WasConnected) {
            this.onclose.trigger();
        } else {
            this.onsecurityerror.trigger();
        }
        this._WasConnected = false;
    }

    private OnSocketError(e: ErrorEvent): void {
        this.onioerror.trigger(e);
    }

    public OnSocketOpen(): void {
        if (!UseCordovaSocket) {
            if (this._WebSocket.protocol) {
                this._Protocol = this._WebSocket.protocol;
            } else {
                this._Protocol = 'plain';
            }
        }

        this._WasConnected = true;
        this.onconnect.trigger();
    }

    private OnWebSocketMessage(e: any): void {
        // Free up some memory if we're at the end of the buffer
        if (this._InputBuffer.bytesAvailable === 0) { this._InputBuffer.clear(); }

        // Save the old position and set the new position to the end of the buffer
        var OldPosition: number = this._InputBuffer.position;
        this._InputBuffer.position = this._InputBuffer.length;

        var Data: ByteArray = new ByteArray();

        // Write the incoming message to the input buffer
        var i: number;
        if (this._Protocol === 'binary') {
            var u8: Uint8Array = new Uint8Array(e.data);
            for (i = 0; i < u8.length; i++) {
                Data.writeByte(u8[i]);
            }
        } else if (this._Protocol === 'base64') {
            // TODO Ensure atob still works with websockify
            Data.writeString(atob(e.data));
        } else {
            Data.writeString(e.data);
        }
        Data.position = 0;

        if (this._LogIO) {
            var DebugLine: string = "";

            while (Data.bytesAvailable) {
                var B: number = Data.readUnsignedByte();
                if (B >= 32 && B <= 126) {
                    DebugLine += String.fromCharCode(B);
                } else {
                    DebugLine += '~' + B.toString(10);
                }
            }
            Data.position = 0;

            if (DebugLine.length > 0) {
                console.log('IN(' + (typeof e.data === 'string' ? 'text' : 'binary') + '): ' + DebugLine);
            }
        }

        this.NegotiateInbound(Data);

        // Restore the old buffer position
        this._InputBuffer.position = OldPosition;

        // Raise ondata event
        this.ondata.trigger();
    }

    // Remap all the read* functions to operate on our input buffer instead
    public readBytes(bytes: ByteArray, offset: number, length: number): void {
        return this._InputBuffer.readBytes(bytes, offset, length);
    }

    public readString(length?: number): string {
        return this._InputBuffer.readString(length);
    }

    public readUnsignedByte(): number {
        return this._InputBuffer.readUnsignedByte();
    }

    public readUnsignedShort(): number {
        return this._InputBuffer.readUnsignedShort();
    }

    public Send(data: number[]): void {
        if (UseCordovaSocket) {
            this._CordovaSocket.write(new Uint8Array(data));
        } else {
            if (this._Protocol === 'binary') {
                this._WebSocket.send(new Uint8Array(data).buffer);
            } else {
                var ToSendString: string = '';
                for (var i = 0; i < data.length; i++) {
                    ToSendString += String.fromCharCode(data[i]);
                }
    
                if (this._Protocol === 'base64') {
                    // TODO Ensure btoa still works with websockify
                    this._WebSocket.send(btoa(ToSendString));
                } else {
                    this._WebSocket.send(ToSendString);
                }
            }
        }

        if (this._LogIO) {
            var DebugLine: string = '';
            for (var i = 0; i < data.length; i++) {
                var B: number = data[i];
                if (B >= 32 && B <= 126) {
                    DebugLine += String.fromCharCode(B);
                } else {
                    DebugLine += '~' + B.toString(10);
                }
            }
            console.log('OUT: ' + DebugLine);
        }
    }

    public set SendLocation(value: boolean) {
        this._SendLocation = value;
    }

    // Remap all the write* functions to operate on our output buffer instead
    public writeByte(value: number): void {
        this._OutputBuffer.writeByte(value);
    }

    public writeBytes(bytes: ByteArray, offset?: number, length?: number): void {
        this._OutputBuffer.writeBytes(bytes, offset, length);
    }

    public writeShort(value: number): void {
        this._OutputBuffer.writeShort(value);
    }

    public writeString(text: string): void {
        this._OutputBuffer.writeString(text);
        this.flush();
    }
}
