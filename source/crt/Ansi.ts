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
class Ansi {
    // Events
    public onDECRQCRA: IEvent = new TypedEvent();
    public onesc0c: IEvent = new TypedEvent();
    public onesc5n: IEvent = new TypedEvent();
    public onesc6n: IEvent = new TypedEvent();
    public onesc8t: IEvent = new TypedEvent();
    public onesc255n: IEvent = new TypedEvent();
    public onescQ: IEvent = new TypedEvent();
    public onripdetect: IEvent = new TypedEvent();
    public onripdisable: IEvent = new TypedEvent();
    public onripenable: IEvent = new TypedEvent();
    public onXTSRGA: IEvent = new TypedEvent();

    private ANSI_COLORS: number[] = [0, 4, 2, 6, 1, 5, 3, 7];

    // From: https://jonasjacek.github.io/colors/data.json
    private ANSI256_COLORS: any[] = [{ 'r': 0, 'g': 0, 'b': 0 }, { 'r': 128, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 128, 'b': 0 }, { 'r': 128, 'g': 128, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 128 }, { 'r': 128, 'g': 0, 'b': 128 }, { 'r': 0, 'g': 128, 'b': 128 }, { 'r': 192, 'g': 192, 'b': 192 }, { 'r': 128, 'g': 128, 'b': 128 }, { 'r': 255, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 255, 'b': 0 }, { 'r': 255, 'g': 255, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 255 }, { 'r': 255, 'g': 0, 'b': 255 }, { 'r': 0, 'g': 255, 'b': 255 }, { 'r': 255, 'g': 255, 'b': 255 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 95 }, { 'r': 0, 'g': 0, 'b': 135 }, { 'r': 0, 'g': 0, 'b': 175 }, { 'r': 0, 'g': 0, 'b': 215 }, { 'r': 0, 'g': 0, 'b': 255 }, { 'r': 0, 'g': 95, 'b': 0 }, { 'r': 0, 'g': 95, 'b': 95 }, { 'r': 0, 'g': 95, 'b': 135 }, { 'r': 0, 'g': 95, 'b': 175 }, { 'r': 0, 'g': 95, 'b': 215 }, { 'r': 0, 'g': 95, 'b': 255 }, { 'r': 0, 'g': 135, 'b': 0 }, { 'r': 0, 'g': 135, 'b': 95 }, { 'r': 0, 'g': 135, 'b': 135 }, { 'r': 0, 'g': 135, 'b': 175 }, { 'r': 0, 'g': 135, 'b': 215 }, { 'r': 0, 'g': 135, 'b': 255 }, { 'r': 0, 'g': 175, 'b': 0 }, { 'r': 0, 'g': 175, 'b': 95 }, { 'r': 0, 'g': 175, 'b': 135 }, { 'r': 0, 'g': 175, 'b': 175 }, { 'r': 0, 'g': 175, 'b': 215 }, { 'r': 0, 'g': 175, 'b': 255 }, { 'r': 0, 'g': 215, 'b': 0 }, { 'r': 0, 'g': 215, 'b': 95 }, { 'r': 0, 'g': 215, 'b': 135 }, { 'r': 0, 'g': 215, 'b': 175 }, { 'r': 0, 'g': 215, 'b': 215 }, { 'r': 0, 'g': 215, 'b': 255 }, { 'r': 0, 'g': 255, 'b': 0 }, { 'r': 0, 'g': 255, 'b': 95 }, { 'r': 0, 'g': 255, 'b': 135 }, { 'r': 0, 'g': 255, 'b': 175 }, { 'r': 0, 'g': 255, 'b': 215 }, { 'r': 0, 'g': 255, 'b': 255 }, { 'r': 95, 'g': 0, 'b': 0 }, { 'r': 95, 'g': 0, 'b': 95 }, { 'r': 95, 'g': 0, 'b': 135 }, { 'r': 95, 'g': 0, 'b': 175 }, { 'r': 95, 'g': 0, 'b': 215 }, { 'r': 95, 'g': 0, 'b': 255 }, { 'r': 95, 'g': 95, 'b': 0 }, { 'r': 95, 'g': 95, 'b': 95 }, { 'r': 95, 'g': 95, 'b': 135 }, { 'r': 95, 'g': 95, 'b': 175 }, { 'r': 95, 'g': 95, 'b': 215 }, { 'r': 95, 'g': 95, 'b': 255 }, { 'r': 95, 'g': 135, 'b': 0 }, { 'r': 95, 'g': 135, 'b': 95 }, { 'r': 95, 'g': 135, 'b': 135 }, { 'r': 95, 'g': 135, 'b': 175 }, { 'r': 95, 'g': 135, 'b': 215 }, { 'r': 95, 'g': 135, 'b': 255 }, { 'r': 95, 'g': 175, 'b': 0 }, { 'r': 95, 'g': 175, 'b': 95 }, { 'r': 95, 'g': 175, 'b': 135 }, { 'r': 95, 'g': 175, 'b': 175 }, { 'r': 95, 'g': 175, 'b': 215 }, { 'r': 95, 'g': 175, 'b': 255 }, { 'r': 95, 'g': 215, 'b': 0 }, { 'r': 95, 'g': 215, 'b': 95 }, { 'r': 95, 'g': 215, 'b': 135 }, { 'r': 95, 'g': 215, 'b': 175 }, { 'r': 95, 'g': 215, 'b': 215 }, { 'r': 95, 'g': 215, 'b': 255 }, { 'r': 95, 'g': 255, 'b': 0 }, { 'r': 95, 'g': 255, 'b': 95 }, { 'r': 95, 'g': 255, 'b': 135 }, { 'r': 95, 'g': 255, 'b': 175 }, { 'r': 95, 'g': 255, 'b': 215 }, { 'r': 95, 'g': 255, 'b': 255 }, { 'r': 135, 'g': 0, 'b': 0 }, { 'r': 135, 'g': 0, 'b': 95 }, { 'r': 135, 'g': 0, 'b': 135 }, { 'r': 135, 'g': 0, 'b': 175 }, { 'r': 135, 'g': 0, 'b': 215 }, { 'r': 135, 'g': 0, 'b': 255 }, { 'r': 135, 'g': 95, 'b': 0 }, { 'r': 135, 'g': 95, 'b': 95 }, { 'r': 135, 'g': 95, 'b': 135 }, { 'r': 135, 'g': 95, 'b': 175 }, { 'r': 135, 'g': 95, 'b': 215 }, { 'r': 135, 'g': 95, 'b': 255 }, { 'r': 135, 'g': 135, 'b': 0 }, { 'r': 135, 'g': 135, 'b': 95 }, { 'r': 135, 'g': 135, 'b': 135 }, { 'r': 135, 'g': 135, 'b': 175 }, { 'r': 135, 'g': 135, 'b': 215 }, { 'r': 135, 'g': 135, 'b': 255 }, { 'r': 135, 'g': 175, 'b': 0 }, { 'r': 135, 'g': 175, 'b': 95 }, { 'r': 135, 'g': 175, 'b': 135 }, { 'r': 135, 'g': 175, 'b': 175 }, { 'r': 135, 'g': 175, 'b': 215 }, { 'r': 135, 'g': 175, 'b': 255 }, { 'r': 135, 'g': 215, 'b': 0 }, { 'r': 135, 'g': 215, 'b': 95 }, { 'r': 135, 'g': 215, 'b': 135 }, { 'r': 135, 'g': 215, 'b': 175 }, { 'r': 135, 'g': 215, 'b': 215 }, { 'r': 135, 'g': 215, 'b': 255 }, { 'r': 135, 'g': 255, 'b': 0 }, { 'r': 135, 'g': 255, 'b': 95 }, { 'r': 135, 'g': 255, 'b': 135 }, { 'r': 135, 'g': 255, 'b': 175 }, { 'r': 135, 'g': 255, 'b': 215 }, { 'r': 135, 'g': 255, 'b': 255 }, { 'r': 175, 'g': 0, 'b': 0 }, { 'r': 175, 'g': 0, 'b': 95 }, { 'r': 175, 'g': 0, 'b': 135 }, { 'r': 175, 'g': 0, 'b': 175 }, { 'r': 175, 'g': 0, 'b': 215 }, { 'r': 175, 'g': 0, 'b': 255 }, { 'r': 175, 'g': 95, 'b': 0 }, { 'r': 175, 'g': 95, 'b': 95 }, { 'r': 175, 'g': 95, 'b': 135 }, { 'r': 175, 'g': 95, 'b': 175 }, { 'r': 175, 'g': 95, 'b': 215 }, { 'r': 175, 'g': 95, 'b': 255 }, { 'r': 175, 'g': 135, 'b': 0 }, { 'r': 175, 'g': 135, 'b': 95 }, { 'r': 175, 'g': 135, 'b': 135 }, { 'r': 175, 'g': 135, 'b': 175 }, { 'r': 175, 'g': 135, 'b': 215 }, { 'r': 175, 'g': 135, 'b': 255 }, { 'r': 175, 'g': 175, 'b': 0 }, { 'r': 175, 'g': 175, 'b': 95 }, { 'r': 175, 'g': 175, 'b': 135 }, { 'r': 175, 'g': 175, 'b': 175 }, { 'r': 175, 'g': 175, 'b': 215 }, { 'r': 175, 'g': 175, 'b': 255 }, { 'r': 175, 'g': 215, 'b': 0 }, { 'r': 175, 'g': 215, 'b': 95 }, { 'r': 175, 'g': 215, 'b': 135 }, { 'r': 175, 'g': 215, 'b': 175 }, { 'r': 175, 'g': 215, 'b': 215 }, { 'r': 175, 'g': 215, 'b': 255 }, { 'r': 175, 'g': 255, 'b': 0 }, { 'r': 175, 'g': 255, 'b': 95 }, { 'r': 175, 'g': 255, 'b': 135 }, { 'r': 175, 'g': 255, 'b': 175 }, { 'r': 175, 'g': 255, 'b': 215 }, { 'r': 175, 'g': 255, 'b': 255 }, { 'r': 215, 'g': 0, 'b': 0 }, { 'r': 215, 'g': 0, 'b': 95 }, { 'r': 215, 'g': 0, 'b': 135 }, { 'r': 215, 'g': 0, 'b': 175 }, { 'r': 215, 'g': 0, 'b': 215 }, { 'r': 215, 'g': 0, 'b': 255 }, { 'r': 215, 'g': 95, 'b': 0 }, { 'r': 215, 'g': 95, 'b': 95 }, { 'r': 215, 'g': 95, 'b': 135 }, { 'r': 215, 'g': 95, 'b': 175 }, { 'r': 215, 'g': 95, 'b': 215 }, { 'r': 215, 'g': 95, 'b': 255 }, { 'r': 215, 'g': 135, 'b': 0 }, { 'r': 215, 'g': 135, 'b': 95 }, { 'r': 215, 'g': 135, 'b': 135 }, { 'r': 215, 'g': 135, 'b': 175 }, { 'r': 215, 'g': 135, 'b': 215 }, { 'r': 215, 'g': 135, 'b': 255 }, { 'r': 215, 'g': 175, 'b': 0 }, { 'r': 215, 'g': 175, 'b': 95 }, { 'r': 215, 'g': 175, 'b': 135 }, { 'r': 215, 'g': 175, 'b': 175 }, { 'r': 215, 'g': 175, 'b': 215 }, { 'r': 215, 'g': 175, 'b': 255 }, { 'r': 215, 'g': 215, 'b': 0 }, { 'r': 215, 'g': 215, 'b': 95 }, { 'r': 215, 'g': 215, 'b': 135 }, { 'r': 215, 'g': 215, 'b': 175 }, { 'r': 215, 'g': 215, 'b': 215 }, { 'r': 215, 'g': 215, 'b': 255 }, { 'r': 215, 'g': 255, 'b': 0 }, { 'r': 215, 'g': 255, 'b': 95 }, { 'r': 215, 'g': 255, 'b': 135 }, { 'r': 215, 'g': 255, 'b': 175 }, { 'r': 215, 'g': 255, 'b': 215 }, { 'r': 215, 'g': 255, 'b': 255 }, { 'r': 255, 'g': 0, 'b': 0 }, { 'r': 255, 'g': 0, 'b': 95 }, { 'r': 255, 'g': 0, 'b': 135 }, { 'r': 255, 'g': 0, 'b': 175 }, { 'r': 255, 'g': 0, 'b': 215 }, { 'r': 255, 'g': 0, 'b': 255 }, { 'r': 255, 'g': 95, 'b': 0 }, { 'r': 255, 'g': 95, 'b': 95 }, { 'r': 255, 'g': 95, 'b': 135 }, { 'r': 255, 'g': 95, 'b': 175 }, { 'r': 255, 'g': 95, 'b': 215 }, { 'r': 255, 'g': 95, 'b': 255 }, { 'r': 255, 'g': 135, 'b': 0 }, { 'r': 255, 'g': 135, 'b': 95 }, { 'r': 255, 'g': 135, 'b': 135 }, { 'r': 255, 'g': 135, 'b': 175 }, { 'r': 255, 'g': 135, 'b': 215 }, { 'r': 255, 'g': 135, 'b': 255 }, { 'r': 255, 'g': 175, 'b': 0 }, { 'r': 255, 'g': 175, 'b': 95 }, { 'r': 255, 'g': 175, 'b': 135 }, { 'r': 255, 'g': 175, 'b': 175 }, { 'r': 255, 'g': 175, 'b': 215 }, { 'r': 255, 'g': 175, 'b': 255 }, { 'r': 255, 'g': 215, 'b': 0 }, { 'r': 255, 'g': 215, 'b': 95 }, { 'r': 255, 'g': 215, 'b': 135 }, { 'r': 255, 'g': 215, 'b': 175 }, { 'r': 255, 'g': 215, 'b': 215 }, { 'r': 255, 'g': 215, 'b': 255 }, { 'r': 255, 'g': 255, 'b': 0 }, { 'r': 255, 'g': 255, 'b': 95 }, { 'r': 255, 'g': 255, 'b': 135 }, { 'r': 255, 'g': 255, 'b': 175 }, { 'r': 255, 'g': 255, 'b': 215 }, { 'r': 255, 'g': 255, 'b': 255 }, { 'r': 8, 'g': 8, 'b': 8 }, { 'r': 18, 'g': 18, 'b': 18 }, { 'r': 28, 'g': 28, 'b': 28 }, { 'r': 38, 'g': 38, 'b': 38 }, { 'r': 48, 'g': 48, 'b': 48 }, { 'r': 58, 'g': 58, 'b': 58 }, { 'r': 68, 'g': 68, 'b': 68 }, { 'r': 78, 'g': 78, 'b': 78 }, { 'r': 88, 'g': 88, 'b': 88 }, { 'r': 98, 'g': 98, 'b': 98 }, { 'r': 108, 'g': 108, 'b': 108 }, { 'r': 118, 'g': 118, 'b': 118 }, { 'r': 128, 'g': 128, 'b': 128 }, { 'r': 138, 'g': 138, 'b': 138 }, { 'r': 148, 'g': 148, 'b': 148 }, { 'r': 158, 'g': 158, 'b': 158 }, { 'r': 168, 'g': 168, 'b': 168 }, { 'r': 178, 'g': 178, 'b': 178 }, { 'r': 188, 'g': 188, 'b': 188 }, { 'r': 198, 'g': 198, 'b': 198 }, { 'r': 208, 'g': 208, 'b': 208 }, { 'r': 218, 'g': 218, 'b': 218 }, { 'r': 228, 'g': 228, 'b': 228 }, { 'r': 238, 'g': 238, 'b': 238 }];

    private _AnsiAttr: number = 7;
    private _AnsiBuffer: string = '';
    private _AnsiIntermediates: string[] = [];
    private _AnsiParams: string[] = [];
    private _AnsiParserState: AnsiParserState = AnsiParserState.None;
    private _AnsiXY: Point = new Point(1, 1);
    private _Crt: Crt;

    constructor(crt: Crt) {
        this._Crt = crt;
    }

    // Source for most commands:
    // http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/src/conio/cterm.txt?content-type=text%2Fplain&revision=HEAD
    // Commands not found in above document noted with NOT IN CTERM.TXT
    private AnsiCommand(finalByte: string): void {
        var Colour: number = 0;
        var Colour256: any;
        var x: number = 0;
        var y: number = 0;
        var z: number = 0;

        switch (finalByte) {
            case '!': /* CSI [ p1 ] !
                            RIP detect
                            Defaults: p1 = 0
                            p1 = 0 performs RIP detect
                            p1 = 1 disables RIP parsing (treat RIPscrip commands as raw text)
                            p1 = 2 enables RIP parsing
                            SOURCE: Unknown 
                            NOT IN CTERM.TXT */
                switch (this.GetNextParam(0)) {
                    case 0: this.onripdetect.trigger(); break;
                    case 1: this.onripdisable.trigger(); break;
                    case 2: this.onripenable.trigger(); break;
                    default:
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        break;
                }
                break;
            case '@':
                if (this._AnsiIntermediates.length === 0) {
                    /* CSI [ p1 ] @
                        Insert Character(s)
                        Defaults: p1 = 1
                        Moves text from the current position to the right edge p1 characters
                        to the right, with rightmost charaters going off-screen and the
                        resulting hole being filled with the current attribute.
                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                    x = Math.max(1, this.GetNextParam(1));
                    this._Crt.InsChar(x);
                } else if (this._AnsiIntermediates.indexOf(' ') !== -1) {
                    // CSI Pn SP @ Scroll Left (SL) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn-sp-scroll-left-sl
                    x = this._Crt.WhereX();
                    y = this._Crt.WhereY();
                    z = Math.max(1, this.GetNextParam(1));
                    for (var i: number = this._Crt.WindMinY + 1; i <= this._Crt.WindMaxY + 1; i++) {
                        this._Crt.GotoXY(1, i);
                        this._Crt.DelChar(z);
                    }
                    this._Crt.GotoXY(x, y);
                }
                break;
            case '{': /* CSI = [ p1 [ ; p2 ] ] {
                        NON-STANDARD EXTENSION.
                        Defaults:  p1 = 255  p2 = 0
                        Indicates that a font block is following.
                        p1 indicates the font slot to place the loaded font into.  This must
                        be higher than the last default defined font (See CSI sp D for list
                        of predefined fonts)  p2 indicates font size according to the
                        following table:
                        0 - 8x16 font, 4096 bytes.
                        1 - 8x14 font, 3586 bytes.
                        2 - 8x8 font, 2048 bytes.

                        SOURCE: CTerm only. */
                console.log('Unhandled ESC sequence: Indicates that a font block is following');
                break;
            case 'A':
                if (this._AnsiIntermediates.length === 0) {
                     /* CSI [ p1 ] A
                        Cursor Up
                        Defaults: p1 = 1
                        Moves the cursor position up p1 lines from the current position.
                        Attempting to move past the screen boundaries stops the cursor
                        at the screen boundary.
                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                    y = Math.max(1, this.GetNextParam(1));
                    y = Math.max(1, this._Crt.WhereY() - y);
                    this._Crt.GotoXY(this._Crt.WhereX(), y);
                } else if (this._AnsiIntermediates.indexOf(' ') !== -1) {
                    // CSI Pn SP A Scroll Right (SR) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn-sp-a-scroll-right-sr
                    x = this._Crt.WhereX();
                    y = this._Crt.WhereY();
                    z = Math.max(1, this.GetNextParam(1));
                    for (var i: number = this._Crt.WindMinY + 1; i <= this._Crt.WindMaxY + 1; i++) {
                        this._Crt.GotoXY(1, i);
                        this._Crt.InsChar(z);
                    }
                    this._Crt.GotoXY(x, y);
                }
                break;                
            case 'B': /* CSI [ p1 ] B
	                        Cursor Down
	                        Defaults: p1 = 1
	                        Moves the cursor position down p1 lines from the current position.
	                        Attempting to move past the screen boundaries stops the cursor
	                        at the screen boundary.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                y = Math.min(this._Crt.WindRows, this._Crt.WhereY() + y);
                this._Crt.GotoXY(this._Crt.WhereX(), y);
                break;
            case 'C': /* CSI [ p1 ] C
	                        Cursor Right
	                        Defaults: p1 = 1
	                        Moves the cursor position right p1 columns from the current position.
	                        Attempting to move past the screen boundaries stops the cursor
	                        at the screen boundary.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                x = Math.max(1, this.GetNextParam(1));
                x = Math.min(this._Crt.WindCols, this._Crt.WhereX() + x);
                this._Crt.GotoXY(x, this._Crt.WhereY());
                break;
            case 'c': /* CSI [ p1 ] c
	                        Device Attributes
	                        Defaults: p1 = 0
	                        If p1 is 0, CTerm will reply with the sequence:
	                        CSI [ = 67;84;101;114;109;pN... c
	                        64;84;101;114;109 is the ASCII values of the 'CTerm' string.  pN is the
	                        CVS revision ID of CTerm with dots converted to semi-colons.
	                        Use the CVS revision to detect if a specific feature is available.  If
	                        you are adding features to a forked version of cterm, please do so by
	                        adding an extra parameter to the end, not by incrementing any existing
	                        one!
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                x = this.GetNextParam(0);
                switch (x) {
                    case 0: this.onesc0c.trigger(); break;
                    default:
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        break;
                }
                break;
            case 'D':
                if (this._AnsiIntermediates.length === 0) {
                    /* CSI [ p1 ] D
                        Cursor Left
                        Defaults: p1 = 1
                        Moves the cursor position left p1 columns from the current position.
                        Attempting to move past the screen boundaries stops the cursor
                        at the screen boundary.
                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                    x = Math.max(1, this.GetNextParam(1));
                    x = Math.max(1, this._Crt.WhereX() - x);
                    this._Crt.GotoXY(x, this._Crt.WhereY());
                } else if (this._AnsiIntermediates.indexOf(' ') !== -1) {
                    /* CSI [ p1 [ ; p2 ] ] sp D
                        Font Selection
                        Defaults: p1 = 0  p2 = 0
                        'sp' indicates a single space character.
                        Sets font p1 to be the one indicated bu p2.  Currently only the primary
                        font (Font zero) and secondary font (Font one) are supported.  p2 must 
                        be between 0 and 255.  Not all output types support font selection.  Only
                        X11 and SDL currently do.
                        Currently included fonts are:
                            0  - Codepage 437 English
                            1  - Codepage 1251 Cyrillic, (swiss)
                            2  - Russian koi8-r
                            3  - ISO-8859-2 Central European
                            4  - ISO-8859-4 Baltic wide (VGA 9bit mapped)
                            5  - Codepage 866 (c) Russian
                            6  - ISO-8859-9 Turkish
                            7  - haik8 codepage (use only with armscii8 screenmap)
                            8  - ISO-8859-8 Hebrew
                            9  - Ukrainian font koi8-u
                            10 - ISO-8859-15 West European, (thin)
                            11 - ISO-8859-4 Baltic (VGA 9bit mapped)
                            12 - Russian koi8-r (b)
                            13 - ISO-8859-4 Baltic wide
                            14 - ISO-8859-5 Cyrillic
                            15 - ARMSCII-8 Character set
                            16 - ISO-8859-15 West European
                            17 - Codepage 850 Multilingual Latin I, (thin)
                            18 - Codepage 850 Multilingual Latin I
                            19 - Codepage 885 Norwegian, (thin)
                            20 - Codepage 1251 Cyrillic
                            21 - ISO-8859-7 Greek
                            22 - Russian koi8-r (c)
                            23 - ISO-8859-4 Baltic
                            24 - ISO-8859-1 West European
                            25 - Codepage 866 Russian
                            26 - Codepage 437 English, (thin)
                            27 - Codepage 866 (b) Russian
                            28 - Codepage 885 Norwegian
                            29 - Ukrainian font cp866u
                            30 - ISO-8859-1 West European, (thin)
                            31 - Codepage 1131 Belarusian, (swiss)
                            32 - Commodore 64 (UPPER)
                            33 - Commodore 64 (Lower)
                            34 - Commodore 128 (UPPER)
                            35 - Commodore 128 (Lower)
                            36 - Atari
                            37 - P0T NOoDLE (Amiga) 
                            38 - mO'sOul (Amiga)    
                            39 - MicroKnight (Amiga)
                            40 - Topaz (Amiga)      
                        Not all fonts are supported in all modes.  If a font is not supported in
                        the current mode, no action is taken.
                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                    x = this.GetNextParam(0);
                    y = this.GetNextParam(0);
                    if ((x === 0) && (y >= 0) && (y <= 40)) {
                        // TODO Should pick based on available screen space, not on biggest to smallest
                        this._Crt.SetFont('SyncTerm-' + y.toString(10));
                    } else {
                        console.log('Unhandled ESC sequence: Secondary Font Selection (set font ' + x + ' to ' + y + ')');
                    }
                    break;
                }
                break;
            case 'E': /* CSI [ p1 ] E
	                        Cursor Next Line
	                        Defaults: p1 = 1
	                        Moves the cursor to the first column of the line p1 down from the current position.
	                        Moving past the bottom of the screen scrolls the screen up the remaining
	                        number of lines filling newly added lines with the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                y = Math.min(this._Crt.WindRows, this._Crt.WhereY() + y);
                this._Crt.GotoXY(1, y);
                break;
            case 'F': /* CSI [ p1 ] F
	                        Cursor Preceding Line
	                        Defaults: p1 = 1
	                        Moves the cursor to the first column if the row p1 up from the current position.
	                        Attempting to move past the screen boundaries stops the cursor
	                        at the screen boundary.
                            SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                y = Math.max(1, this._Crt.WhereY() - y);
                this._Crt.GotoXY(1, y);
                break;
            // Handled under case 'H'
            // case 'f': 
            case 'G': /* CSI [ p1 ] G
	                        Cursor Character Absolute
	                        Defaults: p1 = 1
	                        Movies the cursor to column p1 of the current row.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                x = Math.max(1, this.GetNextParam(1));
                if ((x >= 1) && (x <= this._Crt.WindCols)) {
                    this._Crt.GotoXY(x, this._Crt.WhereY());
                }
                break;
            case 'H':
            case 'f': /* CSI [ p1 [ ; p2 ] ] H
                         CSI [ p1 [ ; p2 ] ] f
	                        Cusror Position
	                        Defaults: p1 = 1  p2 = 1
	                        Moves the cursor to the p2th column of the p1th line.
                            NB: If p1 or p2 are too large, they are reduced to the max allowed for the current Crt window
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                y = Math.min(y, this._Crt.WindMaxY + 1);
                x = Math.max(1, this.GetNextParam(1));
                x = Math.min(x, this._Crt.WindMaxX + 1);
                this._Crt.GotoXY(x, y);
                break;
            case 'h':
                if (this._AnsiParams.length < 1) { this._AnsiParams.push('0'); }
                switch (this._AnsiParams[0]) {
                    case '=255': /* CSI = 255 h
	                                NON-STANDARD EXTENSION
	                                Enable DoorWay Mode
                                    SOURCE: BANSI.TXT */
                        console.log('Unhandled ESC sequence: Enable DoorWay Mode');
                        break;
                    case '?6': /* CSI ? 6 h
	                                NON-STANDARD EXTENSION
                                    Enable origin mode.
                                    In this mode, position parameters are relative to the top left of the
                                    scrolling region, not the screen.
                                    SOURCE: Digital VT102 User Guide */
                        console.log('Unhandled ESC sequence: Enable origin mode');
                        break;
                    case '?7': /* CSI ? 7 h
	                                NON-STANDARD EXTENSION
                                    Enable auto wrap.
                                    This is the normal mode in which a write to the last column of a
                                    row will move the cursor to the start of the next line triggering a
                                    scroll if required to create a new line.
                                    SOURCE: Digital VT102 User Guide */
                        console.log('Unhandled ESC sequence: Enable auto wrap');
                        break;
                    case '?9': /* CSI ? 9 h
                                    X10 compatible mouse reporting
                                    Mouse button presses will send a CSI M <button> <x> <y>
                                    Where <button> is ' ' + button number (0-based)
                                    <x> and <y> are '!' + position (0-based)
                                    SOURCE: xterm */
                        this._Crt.ReportMouse = true;
                    case '?25': /* CSI ? 25 h
	                                NON-STANDARD EXTENSION
	                                Display the cursor
	                                SOURCE: 'Installing and Using the VT320 Video Terminal' */
                        this._Crt.ShowCursor();
                        break;
                    case '?31': /* CSI ? 31 h
	                                NON-STANDARD EXTENSION
	                                Enable alt character set
	                                With this mode set, the bright (1) graphic rendition selects characters
	                                from an alternate character set. */
                        console.log('Unhandled ESC sequence: Enable alt character set');
                        break;
                    case '?32': /* CSI ? 32 h
	                                NON-STANDARD EXTENSION
	                                Bright Intensity Enable
	                                Reverses CSI ? 32 l */
                        console.log('Unhandled ESC sequence: Bright Intensity Enable');
                        break;
                    case '?33': /* CSI ? 33 h
	                                NON-STANDARD EXTENSION
	                                Blink to Bright Intensity Background
	                                With this mode set, the blink (5,6) graphic renditions cause the
	                                background colour to be high intensity rather than causing blink */
                        console.log('Unhandled ESC sequence: Blink to Bright Intensity Background');
                        break;
                    case '?1000': /* CSI ? 1000 h
                                    Normal tracking mode mouse reporting
                                    Mouse button presses will send a CSI M <button> <x> <y>
                                    Where <button> is ' ' + button number (0-based)
                                    Mouse button releases will use a button number of 4
                                    <x> and <y> are '!' + position (0-based)
                                    SOURCE: xterm */
                        this._Crt.ReportMouse = true;
                        break;
                    case '?1006': /* CSI ? 1006 h
                                    SGR encoded extended coordinates
                                    Instead of the CSI M method, the format of mouse reporting
                                    is change to CSI < Pb ; Px ; Py M for presses and
                                    CSI < Pb ; Px ; Py m for releases.
                                    Instead of CSI M
                                    Px and Py are one-based.
                                    Pb remains the same (32 added for movement)
                                    Button 3 is not used for release (separate code)
                                    SOURCE: xterm */
                        this._Crt.ReportMouseSgr = true;
                        break;
                    default:
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        break;
                }
                break;
            case 'I':
            case 'Y':
                // CSI Pn I Cursor Forward Tabulation (CHT) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn-i-cursor-forward-tabulation-cht
                // CSI Pn Y Cursor Line Tabulation (CVT) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn-y-cursor-line-tabulation-cvt
                x = Math.max(1, this.GetNextParam(1));
                this._Crt.Write(StringUtils.NewString('\t', x));
                break;
            case 'J': /* CSI [ p1 ] J
	                        Erase in Page
	                        Defaults: p1 = 0
	                        Erases from the current screen according to the value of p1
	                        0 - Erase from the current position to the end of the screen.
	                        1 - Erase from the current position to the start of the screen.
	                        2 - Erase entire screen.  As a violation of ECMA-048, also moves
	                            the cursor to position 1/1 as a number of BBS programs assume
	                            this behaviour.
	                        Erased characters are set to the current attribute.

	                        SOURCE BANSI.TXT */
                switch (this.GetNextParam(0)) {
                    case 0: this._Crt.ClrEos(); break;
                    case 1: this._Crt.ClrBos(); break;
                    case 2: this._Crt.ClrScr(); break;
                    case 3: this._Crt.ClrScr(); break; // From: https://en.wikipedia.org/wiki/ANSI_escape_code TODOX Also clear the scrollback buffer
                }
                break;
            case 'K': /* CSI [ p1 ] K
	                        Erase in Line
	                        Defaults: p1 = 0
	                        Erases from the current line according to the value pf p1
	                        0 - Erase from the current position to the end of the line.
	                        1 - Erase from the current position to the start of the line.
	                        2 - Erase entire line.
	                        Erased characters are set to the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                switch (this.GetNextParam(0)) {
                    case 0: this._Crt.ClrEol(); break;
                    case 1: this._Crt.ClrBol(); break;
                    case 2: this._Crt.ClrLine(); break;
                }
                break;
            case 'L': /* CSI [ p1 ] L
	                        Insert Line(s)
	                        Defaults: p1 = 1
	                        Inserts p1 lines at the current line position.  The current line and
	                        those after it are scrolled down and the new empty lines are filled with
	                        the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                this._Crt.InsLine(y);
                break;
            case 'l':
                if (this._AnsiParams.length < 1) { this._AnsiParams.push('0'); }
                switch (this._AnsiParams[0]) {
                    case '=255': /* CSI = 255 l
	                                NON-STANDARD EXTENSION
	                                Disable DoorWay Mode
                                    SOURCE: BANSI.TXT */
                        console.log('Unhandled ESC sequence: Disable DoorWay Mode');
                        break;
                    case '?6': /* CSI ? 6 l
	                                NON-STANDARD EXTENSION
                                    Disable origin mode.
                                    In this mode, position parameters are relative to the top left of the
                                    screen, not the scrolling region.
                                    SOURCE: Digital VT102 User Guide */
                        console.log('Unhandled ESC sequence: Disable origin mode');
                        break;
                    case '?7': /* CSI ? 7 l
	                                NON-STANDARD EXTENSION
                                    Disable auto wrap.
                                    This mode causes a write to the last column of a to leave the
                                    cursor where it was before the write occured, overwriting anything
                                    which was previously written to the same position.
                                    SOURCE: Digital VT102 User Guide */
                        console.log('Unhandled ESC sequence: Disable auto wrap');
                        break;
                    case '?9': /* CSI ? 9 l
                                    Disable X10 compatible mouse reporting */
                        this._Crt.ReportMouse = false;
                    case '?25': /* CSI ? 25 l
	                                NON-STANDARD EXTENSION
	                                Hide the cursor
	                                SOURCE: 'Installing and Using the VT320 Video Terminal' */
                        this._Crt.HideCursor();
                        break;
                    case '?31': /* CSI ? 31 l
	                                NON-STANDARD EXTENSION
	                                Disable alt character set
	                                Reverses CSI ? 31 h */
                        console.log('Unhandled ESC sequence: Disable alt character set');
                        break;
                    case '?32': /* CSI ? 32 l
	                                NON-STANDARD EXTENSION
	                                Bright Intensity Disable
	                                Reverses CSI ? 32 h */
                        console.log('Unhandled ESC sequence: Bright Intensity Disable');
                        break;
                    case '?33': /* CSI ? 33 l
	                                NON-STANDARD EXTENSION
	                                Blink Normal
	                                Reverses CSI ? 33 h */
                        console.log('Unhandled ESC sequence: Blink Normal');
                        break;
                    case '?1000': /* CSI ? 1000 l
                                    Disable Normal tracking mode mouse reporting
	                                SOURCE: xterm */
                        this._Crt.ReportMouse = false;
                        break;
                    case '?1006': /* CSI ? 1006 l
                                    Disable SGR encoded extended coordinates
                                    SOURCE: xterm */
                        this._Crt.ReportMouseSgr = false;
                        break;
                    default:
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        break;
                }
                break;
            case 'M':
                if (this._AnsiParams.length < 1) { this._AnsiParams.push('1'); }
                if (this._AnsiParams[0][0] === '=') {
                    /* CSI = [p1] M
                        NON-STANDARD EXTENSION.
                        Defaults:  p1 = 0
                        Sets the current state of ANSI music parsing.
                        0 - Only CSI | will introduce an ANSI music string.
                        1 - Both CSI | and CSI N will introduce an ANSI music string.
                        2 - CSI |, CSI N, and CSI M will all intriduce and ANSI music string.
                            In this mode, Delete Line will not be available.

                        SOURCE: CTerm only. */
                    x = this.GetNextParam(0);
                    switch (x) {
                        case 0:
                            console.log('Unhandled ESC sequence: Only CSI | will introduce an ANSI music string.');
                            break;
                        case 1:
                            console.log('Unhandled ESC sequence: Both CSI | and CSI N will introduce an ANSI music string.');
                            break;
                        case 2:
                            console.log('Unhandled ESC sequence: CSI |, CSI N, and CSI M will all introduce and ANSI music string.');
                            break;
                        default:
                            console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                            break;
                    }
                } else {
                    /* CSI [ p1 ] M
                        Delete Line(s) / 'ANSI' Music
                        Defaults: p1 = 1
                        Deletes the current line and the p1 - 1 lines after it scrolling the
                        first non-deleted line up to the current line and filling the newly
                        empty lines at the end of the screen with the current attribute.
                        If 'ANSI' Music is fully enabled (CSI = 2 M), performs 'ANSI' music
                        instead.
                        See 'ANSI' MUSIC section for more details.

                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf
                        SOURCE: BANSI.TXT */
                    y = Math.max(1, this.GetNextParam(1));
                    this._Crt.DelLine(y);
                }
                break;
            case 'm': /* CSI [ p1 [ ; pX ... ] ] m
	                        Select Graphic Rendition
	                        Defaults: p1 = 0
	                        Sets or clears one or more text attributes.  Unlimited parameters are
	                        supported and are applied in received order.  The following are
	                        supoprted:
	                                                                     Blink Bold FG BG (Modified)
	                        0 -  Default attribute, white on black          X    X  X  X
	                        1 -  Bright Intensity                                X
	                        2 -  Dim intensty                                    X
	                        5 -  Blink (By definition, slow blink)          X
	                        6 -  Blink (By definition, fast blink)          X
	                             NOTE: Both blinks are the same speed.     
	                        7 -  Negative Image - Reverses FG and BG                X  X
	                        8 -  Concealed characters, sets the                     X
	                             forground colour to the background     
		                         colour.     
	                        22 - Normal intensity                                X
	                        25 - Steady (Not blinking)                      X
	                        27 - Positive Image - Reverses FG and BG                X  X
	                             NOTE: This should be a separate     
		                               attribute than 7 but this     
			                           implementation makes them equal     
	                        30 - Black foreground                                   X
	                        31 - Red foreground                                     X
	                        32 - Green foreground                                   X
	                        33 - Yellow foreground                                  X
	                        34 - Blue foreground                                    X
	                        35 - Magenta foreground                                 X
	                        36 - Cyan foreground                                    X
	                        37 - White foreground                                   X
                            38 - Set foreground colour
	                        39 - Default foreground (same as white)	                X
	                        40 - Black background                                      X
	                        41 - Red background                                        X
	                        42 - Green background                                      X
	                        43 - Yellow background                                     X
	                        44 - Blue background                                       X
	                        45 - Magenta background                                    X
	                        46 - Cyan background                                       X
	                        47 - White background                                      X
                            48 - Set background colour
	                        49 - Default background (same as black)                    X
                            90-97 - Set bright foreground colour
                            100-107 - Set bright background colour
	                        All others are ignored.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                if (this._AnsiParams.length < 1) { this._AnsiParams.push('0'); }
                while (this._AnsiParams.length > 0) {
                    x = this.GetNextParam(0);
                    switch (x) {
                        case 0: // Default attribute, white on black
                            this._Crt.NormVideo();
                            break;
                        case 1: // Bright Intensity
                            this._Crt.HighVideo();
                            break;
                        case 2: // Dim intensty
                            this._Crt.LowVideo();
                            break;
                        case 3: // NOT IN CTERM.TXT Italic: on (not widely supported)
                            break;
                        case 4: // NOT IN CTERM.TXT Underline: Single
                            break;
                        case 5: // Blink (By definition, slow blink)
                            this._Crt.SetBlink(true);
                            this._Crt.SetBlinkRate(500);
                            break;
                        case 6: // Blink (By definition, fast blink)
                            this._Crt.SetBlink(true);
                            this._Crt.SetBlinkRate(250);
                            break;
                        case 7: // Negative Image - Reverses FG and BG
                            this._Crt.ReverseVideo();
                            break;
                        case 8: // Concealed characters, sets the forground colour to the background colour.
                            this._AnsiAttr = this._Crt.TextAttr;
                            this._Crt.Conceal();
                            break;
                        case 21: // NOT IN CTERM.TXT Underline: Double (not widely supported)
                            break;
                        case 22: // Normal intensity
                            this._Crt.LowVideo();
                            break;
                        case 24: // NOT IN CTERM.TXT Underline: None
                            break;
                        case 25: // Steady (Not blinking)
                            this._Crt.SetBlink(false);
                            break;
                        case 27: // Positive Image - Reverses FG and BG  
                            // NOTE: This should be a separate attribute than 7 but this implementation makes them equal
                            this._Crt.ReverseVideo();
                            break;
                        case 28: // NOT IN CTERM.TXT Reveal (conceal off)
                            this._Crt.TextAttr = this._AnsiAttr;
                            break;
                        case 30: // Set foreground color, normal intensity
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                            Colour = this.ANSI_COLORS[x - 30];
                            if (this._Crt.TextAttr % 16 > 7) { Colour += 8; }
                            this._Crt.TextColor(Colour);
                            break;
                        case 38: // Set foreground colour (either 5;n for 256, or 2;r;g;b for 24bit)
                            switch (this.GetNextParam(0)) {
                                case 2:
                                    if (this._AnsiParams.length === 3) {
                                        this._Crt.TextColor24(this.GetNextParam(0), this.GetNextParam(0), this.GetNextParam(0));
                                    } else {
                                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                                    }
                                    break;
                                case 5:
                                    Colour256 = this.ANSI256_COLORS[this.GetNextParam(0)];
                                    this._Crt.TextColor24(Colour256.r, Colour256.g, Colour256.b);
                                    break;
                                default:
                                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                                    break;
                            }
                            break;
                        case 39: // Default foreground (same as white)
                            Colour = this.ANSI_COLORS[37 - 30];
                            if (this._Crt.TextAttr % 16 > 7) { Colour += 8; }
                            this._Crt.TextColor(Colour);
                            break;
                        case 40: // Set background color, normal intensity
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                            Colour = this.ANSI_COLORS[x - 40];
                            this._Crt.TextBackground(Colour);
                            break;
                        case 48: // Set background colour (either 5;n for 256, or 2;r;g;b for 24bit)
                            switch (this.GetNextParam(0)) {
                                case 2:
                                    if (this._AnsiParams.length === 3) {
                                        this._Crt.TextBackground24(this.GetNextParam(0), this.GetNextParam(0), this.GetNextParam(0));
                                    } else {
                                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                                    }
                                    break;
                                case 5:
                                    Colour256 = this.ANSI256_COLORS[this.GetNextParam(0)];
                                    this._Crt.TextBackground24(Colour256.r, Colour256.g, Colour256.b);
                                    break;
                                default:
                                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                                    break;
                            }
                            break;
                        case 49: // Default background (same as black)
                            Colour = this.ANSI_COLORS[40 - 40];
                            this._Crt.TextBackground(Colour);
                            break;
                        case 90: // Set bright foreground colour
                        case 91:
                        case 92:
                        case 93:
                        case 94:
                        case 95:
                        case 96:
                        case 97:
                            Colour = this.ANSI_COLORS[x - 90] + 8;
                            this._Crt.TextColor(Colour);
                            break;
                        case 100: // Set bright background colour
                        case 101:
                        case 102:
                        case 103:
                        case 104:
                        case 105:
                        case 106:
                        case 107:
                            Colour = this.ANSI_COLORS[x - 100] + 8;
                            this._Crt.TextBackground(Colour);
                            break;
                    }
                }
                break;
            case 'N': /* CSI N
	                        'ANSI' Music / Not implemented.
	                        If 'ANSI' Music is set to BananaCom (CSI = 1 M) or fully enabled
	                        (CSI = 2 M) performs 'ANSI' muisic.  See 'ANSI' MUSIC section for more
	                        details.
	                        SOURCE: BANSI.TXT */
                console.log('Unhandled ESC sequence: ANSI Music');
                break;
            case 'n':  /* CSI [ p1 ] n
	                        Device Status Report
	                        Defaults: p1 = 0
	                        A request for a status report.  CTerm handles the following three
	                        requests:
	                        5	- Request a DSR
		                          CTerm will always reply with CSI 0 n indicating 
		                          'ready, no malfunction detected'
	                        6	- Request active cursor position
		                          CTerm will reply with CSI y ; x R where y is the current line
		                          and x is
		                          the current row.
	                        255	- NON-STANDARD EXTENSION
		                          Replies as though a CSI [ 6 n was recieved with the cursor in
		                          the bottom right corner.  ie: Returns the terminal size as a
		                          position report.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf
		                        (parameters 5 and 6 only)
	                        SOURCE: BANSI.TXT (parameter 255) */
                x = this.GetNextParam(0);
                switch (x) {
                    case 5: this.onesc5n.trigger(); break;
                    case 6: this.onesc6n.trigger(); break;
                    case 255: this.onesc255n.trigger(); break;
                    default:
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        break;
                }
                break;
            case 'P': /* CSI [ p1 ] P
	                        Delete Character
	                        Defaults: p1 = 1
	                        Deletes the character at the current position by shifting all characters
	                        from the current column + p1 left to the current column.  Opened blanks
	                        at the end of the line are filled with the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                x = Math.max(1, this.GetNextParam(1));
                this._Crt.DelChar(x);
                break;
            case 'Q': /* CSI p1 ; p2 ; p3 Q
                            NON-STANDARD EXTENSION.
                            Change the current font.
                            p1 is the code page
                            p2 is the width
                            p3 is the height 
                            SOURCE: fTelnet
                            NOT IN CTERM.TXT */
                x = this.GetNextParam(0);
                y = this.GetNextParam(0);
                z = this.GetNextParam(0);
                this.onescQ.trigger('CP' + x.toString(10) + '_' + y.toString(10) + 'x' + z.toString(10));
                break;
            case 'r':
                if (this._AnsiIntermediates.length === 0) {
                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                } else if (this._AnsiIntermediates[0].indexOf('*') !== -1) {
                    /* CSI [ p1 [ ; p2 ] ] * r
                        NON-STANDARD EXTENSION.
                        Set the output emulation speed.
                        If p1 or p2 are omitted, causes output speed emulation to stop
                        p1 may be empty.
                        Sequence is ignored if p1 is not empty, 0, or 1.
                        The value of p2 sets the output speed emulation as follows:
                        Value		Speed
                        -----		-----
                        empty, 0	Unlimited
                        1		300
                        2		600
                        3		1200
                        4		2400
                        5		4800
                        6		9600
                        7		19200
                        8		38400
                        9		57600
                        10		76800
                        11		115200
                        SOURCE: VT4xx Specification from http://www.vt100.net/ */
                    console.log('Unhandled ESC sequence: Set the output emulation speed.');
                } else if (this._AnsiIntermediates[0].indexOf(']') !== -1) {
                    /* CSI [ p1 [ ; p2 ] ] r
                        NON-STANDARD EXTENSION.
                        Set Top and Bottom Margins
                        Defaults: p1 = 1
                                  p2 = last line on screen
                        Selects top and bottom margins, defining the scrolling region. P1 is
                        the line number of the first line in the scrolling region. P2 is the line
                        number of the bottom line. */
                    console.log('Unhandled ESC sequence: Set Top and Bottom Margins');
                } else {
                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                }
                break;
            case 'S':
                if ((this._AnsiParams.length >= 2) && (this._AnsiParams[0] === '?2') && (this._AnsiParams[1] === '1')) {
                    // CSI ? Ps1 ; Ps2 S XTerm Set or Request Graphics Attribute (XTSRGA) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-ps1-ps2-s-xterm-set-or-request-graphics-attribute-xtsrga
                    this.onXTSRGA.trigger();
                } else {
                    /* CSI [ p1 ] S
                        Scroll Up
                        Defaults: p1 = 1
                        Scrolls all text on the screen up p1 lines.  New lines emptied at the
                        bottom are filled with the current attribute.
                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                    y = Math.max(1, this.GetNextParam(1));
                    this._Crt.ScrollUpScreen(y);
                }
                break;
            case 's':
                if (this._AnsiIntermediates.length === 0) {
                    /* CSI s
                        NON-STANDARD EXTENSION
                        Save Current Position
                        Saves the current cursor position for later restoring with CSI u
                        although this is non-standard, it's so widely used in the BBS world
                        that any terminal program MUST implement it.
                        SOURCE: ANSI.SYS */
                    this._AnsiXY = new Point(this._Crt.WhereX(), this._Crt.WhereY());
                } else {
                    /* CSI ? [ p1 [ pX ... ] ] s
                        NON-STANDARD EXTENSION
                        Save Mode Setting
                        Saves the current mode states as specified by CSI l and CSI h.  If
                        p1 is omitted, saves all such states.  If pX is included, saves only
                        the specified states (arguments to CSI l/h).
                        SOURCE: SyncTERM only */
                    console.log('Unhandled ESC sequence: Save Mode Setting');
                }
                break;
            case 'T': /* CSI [ p1 ] T
	                        Scroll Down
	                        Defaults: p1 = 1
	                        Scrolls all text on the screen down p1 lines.  New lines emptied at the
	                        top are filled with the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                y = Math.max(1, this.GetNextParam(1));
                this._Crt.ScrollDownWindow(y);
                break;
            case 't': /* CSI p1 p2 p3 p4 t
                            NON-STANDARD EXTENSION
                            24-bit colour
                            p1 = 0 for background, 1 for foreground
                            p2 = red
                            p3 = green
                            p4 = blue 
                            SOURCE: http://picoe.ca/2014/03/07/24-bit-ansi/

                            OR

                            NON-STANDARD EXTENSION
                            Window manipulation
                            Resize the text area to given height and width in characters
                            p1 = 8
                            p2 = height in characters
                            p3 = width in characters
                            SOURCE: https://invisible-island.net/xterm/ctlseqs/ctlseqs.html */
                if (this._AnsiParams.length === 3) {
                    z = this.GetNextParam(0);
                    y = this.GetNextParam(0);
                    x = this.GetNextParam(0);
                    
                    if (z === 8) {
                        if ((x > 0) && (y > 0)) {
                            this.onesc8t.trigger(x, y);
                        } else {
                            console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                        }
                    } else {
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                    }
                } else if (this._AnsiParams.length === 4) {
                    switch (this.GetNextParam(1)) {
                        case 0:
                            this._Crt.TextBackground24(this.GetNextParam(0), this.GetNextParam(0), this.GetNextParam(0));
                            break;

                        case 1:
                            this._Crt.TextColor24(this.GetNextParam(0), this.GetNextParam(0), this.GetNextParam(0));
                            break;

                        default:
                            console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                            break;
                    }
                } else {
                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                }
                break;
            case 'U': /* CSI U
	                        NON-STANDARD (Disabled in current code)
	                        Clear screen with default attribute.
	                        This code is *supposed* to go to the 'next page' according to the
	                        ANSI/ECMA specs with CSI V going to 'previous page'
	                        SOURCE: BANSI.TXT */
                console.log('Unhandled ESC sequence: Clear screen with default attribute');
                break;
            case 'u':
                if (this._AnsiIntermediates.length === 0) {
                    /* CSI u
                        NON-STANDARD EXTENSION
                        Restore Cursor Position
                        Move the cursor to the last position saved by CSI s.  If no position has
                        been saved, the cursor is not moved.
                        SOURCE: ANSI.SYS */
                    this._Crt.GotoXY(this._AnsiXY.x, this._AnsiXY.y);
                } else {
                    /* CSI ? [ p1 [ pX ... ] ]  u
                        NON-STANDARD EXTENSION
                        Restore Mode Setting
                        Saves the current mode states as specified by CSI l and CSI h.  If
                        p1 is omitted, saves all such states.  If pX is included, restores
                        all the specified states (arguments to CSI l/h)
                        SOURCE: SyncTERM only */
                    console.log('Unhandled ESC sequence: Restore Mode Setting');
                }
                break;
            case 'X': /* CSI [ p1 ] X
	                        Erase Character
	                        Defaults: p1 = 1
	                        Erase p1 characters starting at the current character.  Will not erase past the end
	                        of line.
	                        Erased characters are set to the current attribute.
	                        SOURCE: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf */
                x = Math.max(1, this.GetNextParam(1));
                this._Crt.FastWrite(StringUtils.NewString(' ', x), this._Crt.WhereXA(), this._Crt.WhereYA(), this._Crt.CharInfo);
                break;
            // Handled under case 'I'
            // case 'Y': 
            case 'y':
                // CSI Pn1 ; Ps ; Pn2 ; Pn3 ; Pn4 ; Pn5 * y Request Checksum of Rectangular Area (DECRQCRA) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn1-ps-pn2-pn3-pn4-pn5-y-request-checksum-of-rectangular-area-decrqcra
                if ((this._AnsiParams.length === 6) && (this._AnsiIntermediates.length > 0) && (this._AnsiIntermediates[0] === '*')) {
                    x = this.GetNextParam(1);
                    y = this.GetNextParam(1);
                    if (y === 1) {
                        var top: number = this.GetNextParam(1);
                        var left: number = this.GetNextParam(1);
                        var bottom: number = this.GetNextParam(1);
                        var right: number = this.GetNextParam(1);
                        this.onDECRQCRA.trigger(x, left, top, right, bottom);
                    } else {
                        console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                    }
                } else {
                    console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                }
                break;
        
            case 'Z':
                // CSI Pn Z Cursor Backward Tabulation (CBT) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-csi-pn-z-cursor-backward-tabulation-cbt
                // Get current x position and subtract the requested number of tab stops
                x = this._Crt.WhereX() - (this.GetNextParam(1) * 8)

                // Adjust to land at a valid tab stop
                if (x <= 1) {
                    // Don't allow going too far left
                    x = 1;
                } else if (x % 8 !== 0) {
                    // Not exactly at a tab stop, which means we overshot to the left, so move to the next tab stop to the right
                    x += 8 - (x % 8);
                }

                // Move cursor
                this._Crt.GotoXY(x, this._Crt.WhereY());
                break;
            default:
                console.log('Unknown ESC sequence: PB(' + this._AnsiParams.toString() + ') IB(' + this._AnsiIntermediates.toString() + ') FB(' + finalByte + ')');
                break;
        }
    }

    public Checksum(pid: number, x1: number, y1: number, x2: number, y2: number): string {
        return '\x1BP' + pid + '!~' + this._Crt.Checksum(x1, y1, x2, y2) + '\x1B\\';
    }

    ////public ClrBol(): string {
    ////    return '\x1B[1K';
    ////}

    ////public ClrBos(): string {
    ////    return '\x1B[1J';
    ////}

    ////public ClrEol(): string {
    ////    return '\x1B[K';
    ////}

    ////public ClrEos(): string {
    ////    return '\x1B[J';
    ////}

    ////public ClrLine(): string {
    ////    return '\x1B[2K';
    ////}

    ////public ClrScr(): string {
    ////    return '\x1B[2J';
    ////}

    ////public CursorDown(count: number): string {
    ////    if (count === 1) {
    ////        return '\x1B[B';
    ////    } else {
    ////        return '\x1B[' + count.toString() + 'B';
    ////    }
    ////}

    ////public CursorLeft(count: number): string {
    ////    if (count === 1) {
    ////        return '\x1B[D';
    ////    } else {
    ////        return '\x1B[' + count.toString() + 'D';
    ////    }
    ////}

    public CursorPosition(x?: number, y?: number): string {
        if (typeof x === 'undefined') { x = this._Crt.WhereXA(); }
        if (typeof y === 'undefined') { y = this._Crt.WhereYA(); }

        return '\x1B[' + y + ';' + x + 'R';
    }

    ////public CursorRestore(): string {
    ////    return '\x1B[u';
    ////}

    ////public CursorRight(count: number): string {
    ////    if (count === 1) {
    ////        return '\x1B[C';
    ////    } else {
    ////        return '\x1B[' + count.toString() + 'C';
    ////    }
    ////}

    ////public CursorSave(): string {
    ////    return '\x1B[s';
    ////}

    ////public CursorUp(count: number): string {
    ////    if (count === 1) {
    ////        return '\x1B[A';
    ////    } else {
    ////        return '\x1B[' + count.toString() + 'A';
    ////    }
    ////}

    private GetNextParam(defaultValue: number): number {
        var Result = this._AnsiParams.shift();
        if (typeof Result === 'undefined') {
            return defaultValue;
        } else {
            return parseInt(Result, 10);
        }
    }

    ////public GotoX(x: number): string {
    ////    if (x === 1) {
    ////        return this.CursorLeft(255);
    ////    } else {
    ////        return this.CursorLeft(255) + this.CursorRight(x - 1);
    ////    }
    ////}

    ////public GotoXY(x: number, y: number): string {
    ////    return '\x1B[' + y.toString() + ';' + x.toString() + 'H';
    ////}

    ////public GotoY(y: number): string {
    ////    if (y === 1) {
    ////        return this.CursorUp(255);
    ////    } else {
    ////        return this.CursorUp(255) + this.CursorDown(y - 1);
    ////    }
    ////}

    public ScreenSizeInPixels(): string {
        var xSize = this._Crt.ScreenCols * this._Crt.Font.Width;
        var ySize = this._Crt.ScreenRows * this._Crt.Font.Height;
        return '\x1B[?2;0;' + xSize.toString(10) + ';' + ySize.toString(10) + 'S';
    }

    ////public TextAttr(attr: number): string {
    ////    return this.TextColor(attr % 16) + this.TextBackground(Math.floor(attr / 16));
    ////}

    ////public TextBackground(colour: number): string {
    ////    while (colour >= 8) { colour -= 8; }
    ////    return '\x1B[' + (40 + this.ANSI_COLORS[colour]).toString() + 'm';
    ////}

    ////public TextColor(colour: number): string {
    ////    switch (colour % 16) {
    ////        case 0:
    ////        case 1:
    ////        case 2:
    ////        case 3:
    ////        case 4:
    ////        case 5:
    ////        case 6:
    ////        case 7:
    ////            return '\x1B[0;' + (30 + this.ANSI_COLORS[colour % 16]).toString() + 'm' + this.TextBackground(this._Crt.TextAttr / 16);
    ////        case 8:
    ////        case 9:
    ////        case 10:
    ////        case 11:
    ////        case 12:
    ////        case 13:
    ////        case 14:
    ////        case 15: return '\x1B[1;' + (30 + this.ANSI_COLORS[(colour % 16) - 8]).toString() + 'm';
    ////    }

    ////    return '';
    ////}

    public Write(text: string): void {
        // Check for Atari/C64 mode, which doesn't use ANSI
        if (this._Crt.Atari || this._Crt.C64) {
            this._Crt.Write(text);
        } else {
            var Buffer: string = '';

            for (var i: number = 0; i < text.length; i++) {
                if (this._AnsiParserState === AnsiParserState.None) {
                    if (text.charAt(i) === '\x1B') {
                        this._AnsiParserState = AnsiParserState.Escape;
                    } else {
                        Buffer += text.charAt(i);
                    }
                } else if (this._AnsiParserState === AnsiParserState.Escape) {
                    if (text.charAt(i) === '[') {
                        this._AnsiParserState = AnsiParserState.Bracket;
                        this._AnsiBuffer = '';

                        while (this._AnsiParams.length > 0) { this._AnsiParams.pop(); }
                        while (this._AnsiIntermediates.length > 0) { this._AnsiIntermediates.pop(); }
                    // TODOZ Might want to handle these in an AnsiCommand-like function instead of a bunch of else ifs
                    } else if (text.charAt(i) === ']') {
                        // ESC ] Operating System Command (OSC) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-operating-system-command-osc
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.ReadingString;
                    } else if (text.charAt(i) === '^') {
                        // ESC ^ Privacy Message (PM) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-privacy-message-pm
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.ReadingString;
                    } else if (text.charAt(i) === '_') {
                        // ESC _ Application Program Command (APC) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-_-application-program-command-apc
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.ReadingString;
                    } else if (text.charAt(i) === 'c') {
                        // ESC c Reset to Initial State (RIS) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-c-reset-to-initial-state-ris
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this._Crt.NormVideo();
                        this._Crt.ClrScr();

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if (text.charAt(i) === 'E') {
                        // ESC E Next Line (NEL) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-e-next-line-nel
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this._Crt.Write('\r\n');

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if (text.charAt(i) === 'H') {
                        // ESC H Set Tab (HTS) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-h-set-tab-hts
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        console.log('Unhandled ESC sequence: Sets a tab stop at the current column');

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if (text.charAt(i) === 'M') {
                        // ESC M Reverse Line Feed (RI) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-m-reverse-line-feed-ri
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        var y: number = Math.max(1, this._Crt.WhereY() - 1);
                        this._Crt.GotoXY(this._Crt.WhereX(), y);

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if (text.charAt(i) === 'P') {
                        // ESC P	Device Control String (DCS) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-pdevice-control-string-dcs
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.ReadingString;
                    } else if (text.charAt(i) === 'X') {
                        // ESC X Start Of String (SOS) https://gitlab.synchro.net/main/sbbs/-/blob/master/src/conio/cterm.adoc#user-content-esc-x-start-of-string-sos
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.ReadingString;
                    } else {
                        Buffer += text.charAt(i);
                        this._AnsiParserState = AnsiParserState.None;
                    }
                } else if (this._AnsiParserState === AnsiParserState.Bracket) {
                    if (text.charAt(i) === '!') {
                        // Handle ESC[!, which is rip detect
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this.AnsiCommand(text.charAt(i));

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if ((text.charAt(i) >= '0') && (text.charAt(i) <= '?')) {
                        // It's a parameter byte
                        if (text.charAt(i) === ';') {
                            this._AnsiParams.push((this._AnsiBuffer === '') ? '0' : this._AnsiBuffer);
                            this._AnsiBuffer = '';
                        } else {
                            this._AnsiBuffer += text.charAt(i);
                        }
                        this._AnsiParserState = AnsiParserState.ParameterByte;
                    } else if ((text.charAt(i) >= ' ') && (text.charAt(i) <= '/')) {
                        // It's an intermediate byte
                        this._AnsiIntermediates.push(text.charAt(i));
                        this._AnsiParserState = AnsiParserState.IntermediateByte;
                    } else if ((text.charAt(i) >= '@') && (text.charAt(i) <= '~')) {
                        // Final byte, output whatever we have buffered
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this.AnsiCommand(text.charAt(i));

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else {
                        // Invalid sequence
                        Buffer += text.charAt(i);
                        this._AnsiParserState = AnsiParserState.None;
                    }
                } else if (this._AnsiParserState === AnsiParserState.ParameterByte) {
                    if (text.charAt(i) === '!') {
                        // Handle ESC[0!, which is rip detect (or ESC[1! or ESC[2! which are disable/enable)
                        this._AnsiParams.push((this._AnsiBuffer === '') ? '0' : this._AnsiBuffer);
                        this._AnsiBuffer = '';

                        // Output whatever we have buffered
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this.AnsiCommand(text.charAt(i));

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else if (text.charAt(i) === ';') {
                        // Start of new parameter
                        this._AnsiParams.push((this._AnsiBuffer === '') ? '0' : this._AnsiBuffer);
                        this._AnsiBuffer = '';
                    } else if ((text.charAt(i) >= '0') && (text.charAt(i) <= '?')) {
                        // Additional parameter byte
                        this._AnsiBuffer += text.charAt(i);
                    } else if ((text.charAt(i) >= ' ') && (text.charAt(i) <= '/')) {
                        // Intermediate byte, push buffer to new parameter
                        this._AnsiParams.push((this._AnsiBuffer === '') ? '0' : this._AnsiBuffer);
                        this._AnsiBuffer = '';

                        this._AnsiIntermediates.push(text.charAt(i));
                        this._AnsiParserState = AnsiParserState.IntermediateByte;
                    } else if ((text.charAt(i) >= '@') && (text.charAt(i) <= '~')) {
                        // Final byte, push buffer to new parameter
                        this._AnsiParams.push((this._AnsiBuffer === '') ? '0' : this._AnsiBuffer);
                        this._AnsiBuffer = '';

                        // Output whatever we have buffered
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this.AnsiCommand(text.charAt(i));

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else {
                        // Invalid command
                        Buffer += text.charAt(i);
                        this._AnsiParserState = AnsiParserState.None;
                    }
                } else if (this._AnsiParserState === AnsiParserState.IntermediateByte) {
                    if ((text.charAt(i) >= '0') && (text.charAt(i) <= '?')) {
                        // Parameter byte, which is illegal at this point
                        Buffer += text.charAt(i);
                        this._AnsiParserState = AnsiParserState.None;
                    } else if ((text.charAt(i) >= ' ') && (text.charAt(i) <= '/')) {
                        // Additional intermediate byte
                        this._AnsiIntermediates.push(text.charAt(i));
                    } else if ((text.charAt(i) >= '@') && (text.charAt(i) <= '~')) {
                        // Final byte byte, output whatever we have buffered
                        this._Crt.Write(Buffer);
                        Buffer = '';

                        // Handle the command
                        this.AnsiCommand(text.charAt(i));

                        // Reset the parser state
                        this._AnsiParserState = AnsiParserState.None;
                    } else {
                        // Invalid command
                        Buffer += text.charAt(i);
                        this._AnsiParserState = AnsiParserState.None;
                    }
                } else if (this._AnsiParserState === AnsiParserState.ReadingString) {
                    if (text.charAt(i) === '\x1B') {
                        this._AnsiParserState = AnsiParserState.ReadingStringEscape;
                    } else {
                        Buffer += text.charAt(i);
                    }
                } else if (this._AnsiParserState === AnsiParserState.ReadingStringEscape) {
                    if (text.charAt(i) === '\\') {
                        console.log('Ansi.ts read string: ' + Buffer);
                    } else {
                        console.log('Ansi.ts unexpected post-ESC char while reading string: ' + text.charAt(i) + ' (Buffer=' + Buffer + ')');
                    }
                    Buffer = '';
                    this._AnsiParserState = AnsiParserState.None;
                } else {
                    Buffer += text.charAt(i);
                }
            }

            this._Crt.Write(Buffer);
        }
    }

    public WriteLn(text: string): void {
        this.Write(text + '\r\n');
    }
}
