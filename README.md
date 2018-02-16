# Guntanks!

## Overview
Guntanks! is a simplified clone of popular turn based tank games like Worms and Gunbound. It has a simple 2D physics engine, destructible terrain, user controlled tanks, artillery, a delay queueing system, and wind that affects the trajectory of projectiles.

## Features
* Tanks that can move, shoot, and have health
* 3 different types of shots
* Destructible Terrain
* Simple 2D physics engine for projectile motion and wind
* Artillery that can interact with the terrain and tanks
* Wind that affects the trajectories of artillery

## How to Play
* Play locally with 4 players.
* On your turn, you have 30 seconds until your turn ends.
* Move with 'A' or 'D'.
* Adjust the angle of your shot with 'W' or 'S'
* Select which shot you want to use with '1', '2', or '3' or by clicking on the buttons.
* Adjust the power of your shot by pressing and holding 'Space'. Let go of 'Space' to fire your shot.
* Watch out for wind!

## Details

### Tanks
* Tanks start with 1000 health.
* A tank will die when its health is reduced to 0 or it falls off of the terrain.
* Tanks can move a limited distance during their turn and climb terrain. Some terrain is too steep to climb.

### Delay
* Every second you take during your turn adds to your delay which determines when your next turn will happen.
* Firing shots also adds to your delay.
* Shot 1 adds 750, Shot 2 adds 900, and your Special Shot (SS) will add 1330 to your delay.
* The current turn order and delay for each player is displayed in the Delay Queue.

### Shells
* A tank can fire 3 different types of shells.
* Shot 1 is the most basic type of shell. It does 130 damage, has a moderate explosion radius, and is lighter than the other shells.
* Shot 2 does 240 damage and has a small explosion radius.
* SS does 350 damage and has a large explosion radius. It has a 3 turn cooldown time.

### Terrain
* Terrain can be destroyed by shooting it with shells.
* Different shells destroy more or less terrain.
* If all the terrain under a tank is destroyed, the tank will be eliminated.

### Wind
* The wind indicator displays the wind speed and angle.
* Wind can come at any angle and a speed between 0 and 25.
* Wind will affect the trajectory of shots.
* Wind will change every 3 rounds to a random speed and angle.
