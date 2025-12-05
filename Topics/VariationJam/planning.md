# Planning

Using first frog game and bulding off of it// creating a platform with multiple frog games

## Starting point

The initial idea:

- Frog eating flies
- Hungry Hungry Hipppo inspo game
- SNakes and ladder inspo game
- card flip insporation game
- Frog run/frogs racing eacher

## Experience design

The experience:

> The user would start on a landing page which game options to chose from. After picking the game option the user is met with a set of clear intructions before playing the game, than the user will be giving the option to start the game.

## Breaking it down

Basic things to do:

- Create the landing page using Html
- Finalize visuals/ frog/lily pad/lostus
- Friggering frog movements
- Deciide on the length of each game
- Figure out The hungry hippo game search for references and inspo
- Css animations considerations

Questions:

- What does the frog look like?
  - vector image
- How does the user control the frog?
  - User controls frog with the mouse my clicking on the lilypads
  - User launches the tongue with a keyboard click "z"
- How does the fly move?
  - The fly starts on the left at a random y position, and moves to the right at times jitter and others in a line
- What does the tongue look like?
  - A red line coming out of the frog...
- What happens if the user doesn't catch the fly?
  - If the fly goes off the right side,
- What does it all look like on the screen? Layout?
  - Frog at the bottom on a lilypad, fly moving across, tongue shooting out of frog

## The program starts to form....

What is there?

- The frog
  - Position and size
  - Position and size of tongue
  - What is the tongue doing?
- The fly
  - Position and the size
  - Velocity

```
frog
    body
        x
        y
        size
    tongue
        x
        y
        size
        speed
        state

fly
    x
    y
    size
    speed
```

What happens in this project?

- Start (setup)
  - Create a canvas
- Every frame (draw)
  - Draw the background
  - Move and draw the fly
    - Add the fly's speed to it x
    - Draw a circle at the fly's position with its size (black)
  - Move and draw the frog
    - Move the frog to the mouse's x position
    - Draw a green circle at the frog's position with its size
  - Move and draw the tongue
    - Move the tongue
      - If the tongue isn't launched, just do nothing... don't draw it
      - If the tongue is launched, move it up (by its speed)
      - If the tongue is coming back, move it down (by its speed)
      - If the tongue hits the top, send it back down
      - If the tongue gets back to the frog, then stop it
    - Draw the tongue
      - Draw a line from the frog to the tongue position
      - Draw a circle at the end of the tongue
  - Check if the tongue hit the fly
    - Check if tongue circle and fly circle overlap
    - If they do, then reset the fly
    - If they don't.... nothing... just keep being a tongue

Events

- If the user clicks the mouse
  - They can control the position of the lily pad
- if the user clicks "z" they can control the timing of the tongue catching fly
  - If the tongue is still inside the frog's mouth
    - Launch the tongue
