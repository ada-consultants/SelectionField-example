# Selection field example

Selection field allows to popup a window with a grid to select an element. When
the element is selected, the window hides and then the value of the element 
goes back in the field with it's id.

## Problem

The current code doesn't work well with an editable grid. 

When the user clicks in the window that is shown when the trigger is clicked, 
it blurs the SelectionField behind.

In an editable grid, it stops listening for value change when the field is
blured. So when the user choose a value, the code push it to the field but the
grid doesn't catch it and put it in the corresponding record.

We had to override the `validateBlur` function to prevent the field to blur
when the window is visible. But we cannot make it to blur when the window closes.

That's where we are now ;)