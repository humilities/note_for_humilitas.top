At first, the commands below are almost executed in the normal mode

***

## delete the content in the end of the file 
- from to the end of the file . command :`dG`

## delete the specific code block(function&backers)
If you are in the function or loop , you wilt select by yourself
- delete the code in the {}. command: di{
- delete the code (contain the backers). command: da{

## the best way i think
delete the specific lines
command: `:10,50d`


i dont want to code the sheet by hand

delete the current line -> dd
delete the next 10 lines -> 10dd

**NOTE: the undo way, `u` to undo the last change**