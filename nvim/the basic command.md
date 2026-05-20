there we mainly introduce the commands of the internal command

there three modes for use:
- normal mode: press `esc` to enter.  Just for move , delete , paste , and copy.
- insert mode: press `i` or `a` to enter. Used for code like normal IDE.
- command mode: press `:` to enter
- visual mode: press `v` to enter

## the cheat sheet

 ### the fast move in normal mode
 - basic: `h`(left) `j`(down) `k`(up) `l`(right)
 - the skip for word: `w` for skipping to the begin of next word, `b`for skipping to the begin of last word
 - `0` begin of line , `$` end of line
 - the skip for search: `/keyword` and press `enter` to skip and press `n` for the next one

### the trick of normal mode
- `u`: undo 
- `ctrl+r`: redo
- `dd`: delete the current line
- `yy`: yank the current line
- `p`: paste to the word after mouse
- `x`: delete the string in the mouse

### the split
- `:sv` split in horizontal and `vs` split in vertical
- `ctrl+w` switch between two windows
- `:term` open a terminal in nvim


##  create the file and folder
because i install the plugin called nvim-tree, the way create a file is hon over the folder and press `a` the create a file, a folder, then with a `/` in the end