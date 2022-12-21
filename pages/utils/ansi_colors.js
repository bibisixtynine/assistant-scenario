export const ANSI = {
    RESET: "\u001B[0m",
    BLACK: "\u001B[30m",
    RED: "\u001B[1;31m",
    GREEN: "\u001B[1;32m",
    LIGHT_YELLOW: "\u001B[1;93m",
    YELLOW: "\u001B[1;33m",
    YELLOW_BACKGROUND: "\u001B[1;43m",
    BLUE: "\u001B[1;34m",
    PURPLE: "\u001B[1;35m",
    CYAN: "\u001B[1;36m",
    WHITE: "\u001B[1;37m",
    BOLD: "\u001B[1m",
    UNBOLD: "\u001B[21m",
    UNDERLINE: "\u001B[4m",
    STOP_UNDERLINE: "\u001B[24m",
}


/*
usage :

import './utils/ansi_colors.js';
console.log(ANSI.GREEN + "green message" +"- \noh yeah" + ANSI.RESET);
console.log(ANSI.RED + "red message" + ANSI.RESET);


more info :

https://en.wikipedia.org/wiki/ANSI_escape_code

Those are ANSI terminal escape codes. Specifically, they're "select graphic rendition" (SGR) escape codes, which consist of:

the "command sequence introducer", consisting of the characters \x1B (ESC) and [,
one or more numeric commands, separated by semicolons, and
the letter m, ending the code and indicating that this is an SGR code.
There are many possible numeric commands (and many other escape codes besides SGR), but the most relevant ones are:

30–37: set text color to one of the colors 0 to 7,
40–47: set background color to one of the colors 0 to 7,
39: reset text color to default,
49: reset background color to default,
1: make text bold / bright (this is the standard way to access the bright color variants),
22: turn off bold / bright effect, and
0: reset all text properties (color, background, brightness, etc.) to their default values.
Thus, for example, one could select bright purple text on a green background (eww!) with the code \x1B[35;1;42m.
*/