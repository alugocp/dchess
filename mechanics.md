# Unit mechanics
This is a document for coming up with spells and properties within the mechanics of the game.

## Game constraints
- Health (max health, changes in health)
- Position (row, column, proximity based abilities) (can change units' locations)
- Tags (some units are just special or interact in special ways based on tags)
- Unique unit stats (some units can have energy or some other resource)
- Speed (determines which unit gets its turn first)
- Properties (passive effects)
- Spells (abilities that a unit gets to activate each turn)
- Turns (effects are activated on a unit's turn, the game consists essentially of a string of turns)
- Obstacles (there will be interactive and non-interactive units on the map)

## Ability concepts
- Poison (multi-turn damaging property applied to targets)
- Leap (Resource-dependent move ability, could do something on landing)
- Can spawn in an obstacle (may be temporary)
- Modifies the speed of a target (maybe with an attack)
- Loses a buff property after a couple of turns
- Temporarily applies or removes a tag from a target
- Prevents a target from activating any spells for a turn
- Swaps places with target
- Can teleport a target
- Increase or decrease to max health of target
- Delayed healing of target
- Temporary immunity
