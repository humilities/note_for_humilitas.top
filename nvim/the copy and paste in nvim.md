The concept of copy and paste in nvim are different to the normal editor like VS code .
Nvim uses the register.

## the contract of the center keywords
there we still use the -> instead of the sheet
**Yank** = Copy
**Put** = Paste
**Delete** = Cut

## the basic operation in normal mode
yank one line -- `yy` 
yank one word -- `yiw`
put after the mouse -- `P`
put forward the mouse -- `p`
yank the chosen content -- `y` (press `v` to enter the visual mode) 

## concerning sync with the system clipboard
add the following code to the `init.lua`
```lua
vim.opt.clipboard = "unnamedplus"
```
add  if use the LazyVim, this setting is opened by default.

## deep in the Registers in nvim
Like the Nvim has many clipboard. You can use `"` to specific the register
- `"ay` put the chosen content to the register named `a`
- `"ap` paste from the register named `a`
-  and insert `"reg` to watch what content has been stored in the regsiters