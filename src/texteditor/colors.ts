enum Colors {
    BLACK = 0,
    RED,
    GREEN,
    YELLOW,
    BLUE,
    PURPLE,
    GRAY,
    WHITE,
    COLORS_COUNT
};

const ColorTable = new Array<string>(Colors.COLORS_COUNT); 

ColorTable[Colors.BLACK]    = "black";
ColorTable[Colors.RED]      = "red";
ColorTable[Colors.GREEN]    = "green";
ColorTable[Colors.YELLOW]   = "yellow";
ColorTable[Colors.BLUE]     = "blue";
ColorTable[Colors.PURPLE]   = "purple";
ColorTable[Colors.GRAY]     = "gray";
ColorTable[Colors.WHITE]    = "white";


export { Colors, ColorTable };
