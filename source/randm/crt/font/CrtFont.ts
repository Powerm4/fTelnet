/*
  fTelnet: An HTML5 WebSocket client
  Copyright (C) 2009-2013  Rick Parrish, R&M Software

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
class CrtFont {
    // Events
    public onchange: IEvent = new TypedEvent();

    // Public variables
    public static ANSI_COLOURS: number[] = [
        0x000000, 0x0000A8, 0x00A800, 0x00A8A8, 0xA80000, 0xA800A8, 0xA85400, 0xA8A8A8,
        0x545454, 0x5454FC, 0x54FC54, 0x54FCFC, 0xFC5454, 0xFC54FC, 0xFCFC54, 0xFCFCFC];

    // From http://www.c64-wiki.com/index.php/Color
    // public static PETSCII_COLOURS: string[] = [
    //     '#000000', '#ffffff', '#880000', '#aaffee', '#cc44cc', '#00cc55', '#0000aa', '#eeee77',
    //     '#dd8855', '#664400', '#ff7777', '#333333', '#777777', '#aaff66', '#0088ff', '#bbbbbb'];

    // From http://www.pepto.de/projects/colorvic/
    // public static PETSCII_COLOURS: string[] = [
    //     '#000000', '#ffffff', '#68372B', '#70A4B2', '#6F3D86', '#588D43', '#352879', '#B8C76F',
    //     '#6F4F25', '#433900', '#9A6759', '#444444', '#6C6C6C', '#9AD284', '#6C5EB5', '#959595'];

    // From http://en.wikipedia.org/wiki/File:C64_ntsc_cxa2025.bmp.png
    // public static PETSCII_COLOURS: string[] = [
    //     '#000000', '#ffffff', '#FA3200', '#1DE0FF', '#A84BCC', '#68BB50', '#004AD0', '#FFEB45',
    //     '#FF5B00', '#C23D00', '#FF7142', '#FF7142', '#8A9578', '#B3FF97', '#4788FF', '#C3B8D7'];

    // From CGterm
    public static PETSCII_COLOURS: number[] = [
        0x000000, 0xFDFEFC, 0xBE1A24, 0x30E6C6, 0xB41AE2, 0x1FD21E, 0x211BAE, 0xDFF60A,
        0xB84104, 0x6A3304, 0xFE4A57, 0x424540, 0x70746F, 0x59FE59, 0x5F53FE, 0xA4A7A2];

    // Private variables
    private _Canvas: HTMLCanvasElement;
    private _CanvasContext: CanvasRenderingContext2D;
    private _CharMap: ImageData[];
    private _CodePage: string;
    private _Loading: number;
    private _Lower: HTMLImageElement;
    private _NewCodePage: string;
    private _NewSize: Point;
    private _Size: Point;
    private _Upper: HTMLImageElement;

    constructor() {
        this._Canvas = null;
        this._CanvasContext = null;
        this._CharMap = [];
        this._CodePage = '437';
        this._Loading = 0;
        this._Lower = null;
        this._NewCodePage = '437';
        this._NewSize = new Point(9, 16);
        this._Size = new Point(9, 16);
        this._Upper = null;

        this._Canvas = document.createElement('canvas');
        if (this._Canvas.getContext) {
            this._CanvasContext = this._Canvas.getContext('2d');
            this.Load(this._CodePage, this._Size.x, this._Size.y);
        }
    }

    public get CodePage(): string {
        return this._CodePage;
    }

    public GetChar(charCode: number, charInfo: CharInfo): ImageData {
        if (this._Loading > 0) { return null; }

        // Validate values
        if ((charCode < 0) || (charCode > 255) || (charInfo.Attr < 0) || (charInfo.Attr > 255)) { return null; }

        var CharMapKey: string = charCode + '-' + charInfo.Attr + '-' + charInfo.Reverse;

        // Check if we have used this character before
        if (!this._CharMap[CharMapKey]) {
            // Nope, so get character (in black and white)
            this._CharMap[CharMapKey] = this._CanvasContext.getImageData(charCode * this._Size.x, 0, this._Size.x, this._Size.y);

            // Now colour the character
            var Back: number;
            var Fore: number;
            if (this._CodePage.indexOf('PETSCII') === 0) {
                Back = CrtFont.PETSCII_COLOURS[(charInfo.Attr & 0xF0) >> 4];
                Fore = CrtFont.PETSCII_COLOURS[(charInfo.Attr & 0x0F)];
            } else {
                Back = CrtFont.ANSI_COLOURS[(charInfo.Attr & 0xF0) >> 4];
                Fore = CrtFont.ANSI_COLOURS[(charInfo.Attr & 0x0F)];
            }

            // Reverse if necessary
            if (charInfo.Reverse) {
                var Temp: number = Fore;
                Fore = Back;
                Back = Temp;
            }

            // Get the individual RGB colours
            var BackR: number = Back >> 16; // parseInt(Back[1].toString() + Back[2].toString(), 16);
            var BackG: number = (Back >> 8) & 0xFF; // parseInt(Back[3].toString() + Back[4].toString(), 16);
            var BackB: number = Back & 0xFF; // parseInt(Back[5].toString() + Back[6].toString(), 16);
            var ForeR: number = Fore >> 16; // parseInt(Fore[1].toString() + Fore[2].toString(), 16);
            var ForeG: number = (Fore >> 8) & 0xFF; // parseInt(Fore[3].toString() + Fore[4].toString(), 16);
            var ForeB: number = Fore & 0xFF; // parseInt(Fore[5].toString() + Fore[6].toString(), 16);

            // Colour the pixels 1 at a time
            var R: number = 0;
            var G: number = 0;
            var B: number = 0;
            for (var i: number = 0; i < this._CharMap[CharMapKey].data.length; i += 4) {
                // Determine if it's back or fore colour to use for this pixel
                if (this._CharMap[CharMapKey].data[i] & 0x80) {
                    R = ForeR;
                    G = ForeG;
                    B = ForeB;
                } else {
                    R = BackR;
                    G = BackG;
                    B = BackB;
                }

                this._CharMap[CharMapKey].data[i] = R;
                this._CharMap[CharMapKey].data[i + 1] = G;
                this._CharMap[CharMapKey].data[i + 2] = B;
                this._CharMap[CharMapKey].data[i + 3] = 255;
            }
        }

        // Return the character if we have it
        return this._CharMap[CharMapKey];
    }

    public get Height(): number {
        return this._Size.y;
    }

    public Load(codePage: string, maxWidth: number, maxHeight: number): boolean {
        // Find the biggest instance of the given font
        var FontName: string = CrtFonts.GetBestFit(codePage, maxWidth, maxHeight);
        if (FontName === null) {
            console.log('fTelnet Error: Font CP=' + codePage + ' does not exist');
            return false;
        } else {
            var Pieces: string[] = FontName.split('x');
            var Width: number = parseInt(Pieces[1], 10);
            var Height: number = parseInt(Pieces[2], 10);

            // Check if we're requesting the same font we already have
            if ((this._Lower != null) && (this._CodePage === Pieces[0]) && (this._Size.x === Width) && (this._Size.y === Height)) {
                return true;
            }

            CrtFont.ANSI_COLOURS[7] = 0xA8A8A8;
            CrtFont.ANSI_COLOURS[0] = 0x000000;

            this._Loading += 1;
            this._NewCodePage = codePage;
            this._NewSize = new Point(Width, Height);

            // Check for PC or other font
            if (isNaN(parseInt(codePage, 10))) {
                // non-number means not a PC codepage

                // Override colour for ATASCII clients
                if (codePage.indexOf('ATASCII') === 0) {
                    CrtFont.ANSI_COLOURS[7] = 0x63B6E7;
                    CrtFont.ANSI_COLOURS[0] = 0x005184;
                }

                this._Lower = new Image();
                this._Lower.onload = (): void => { this.OnLoadUpper(); };
                this._Lower.src = CrtFonts.Get(codePage, Width, Height);
                this._Upper = null;
            } else {
                // Load the lower font
                this._Lower = new Image();
                this._Lower.onload = (): void => { this.OnLoadLower(); };
                this._Lower.src = CrtFonts.Get('ASCII', Width, Height);
            }

            return true;
        }
    }

    private OnLoadLower(): void {
        // Load the upper font
        this._Upper = new Image();
        this._Upper.onload = (): void => { this.OnLoadUpper(); };
        this._Upper.src = CrtFonts.Get(this._NewCodePage, this._NewSize.x, this._NewSize.y);
    }

    private OnLoadUpper(): void {
        this._CodePage = this._NewCodePage;
        this._Size = this._NewSize;

        // Reset Canvas
        if (this._Upper) {
            this._Canvas.width = this._Lower.width * 2; // *2 for lower and upper ascii
        } else {
            this._Canvas.width = this._Lower.width;
        }
        this._Canvas.height = this._Lower.height;
        this._CanvasContext.drawImage(this._Lower, 0, 0);
        if (this._Upper) { this._CanvasContext.drawImage(this._Upper, this._Lower.width, 0); }

        // Reset CharMap
        this._CharMap = [];

        // Raise change event
        this._Loading -= 1;
        this.onchange.trigger();
    }

    public get Size(): Point {
        return this._Size;
    }

    public get Width(): number {
        return this._Size.x;
    }
}