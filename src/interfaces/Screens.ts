export interface IScreens {
    screens: IScreen[];
}

export interface IScreen {
    availHeight:      number;
    availLeft:        number;
    availTop:         number;
    availWidth:       number;
    label:            null | string;
    colorDepth?:       number;
    devicePixelRatio?: number;
    height?:           number;
    isExtended?:       boolean;
    isInternal?:       boolean;
    isPrimary?:        boolean;
    left?:             number;
    onchange?:         null;
    orientation?:      Orientation;
    pixelDepth?:       number;
    top?:              number;
    width?:            number;
}

interface Orientation {
    angle:    number;
    onchange: null;
    type:     string;
}
