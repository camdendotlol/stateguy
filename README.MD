# StateGuy

A friendly guy who lives inside your browser and manages your state.

by Camden Mecklem, 2021

released under MIT license

## What is StateGuy?

StateGuy is a simple frameworkless state management system inspired by React-Redux.

## How do I use it?

Just download ``stateguy.js`` and put it in your project folder. You can import it the usual way from any JS file:

``import stateguy from "stateguy.js";``

Once you've done that, You can tie DOM elements to state object properties by assigning a class name with the
"sg-" prefix. For example:

``<span class="sg-city-population"></span>``

This span element will display the value from ``state.city.population``. StateGuy will automatically update the element each time the state updates.

Keep in mind that, in the current implementation, the "sg-" class must be the first one listed or else StateGuy won't see it. You can add other classes after it if needed.

You can also access values from the state in JavaScript by calling the ``fetch`` function. Arguments are turned into an object path.

For example:

``const population = stateguy.fetch('kentucky', 'population')`` => state.kentucky.population

## How can I contribute?

The best way you can contribute is by looking through the code and filing issues. I'm still very much a junior-level programmer and it's likely that I haven't used the best implementations of certain things.

Other than that, I would prefer to tackle the design and code myself at this stage. I've learned a lot from making this already and some of the thornier problems left to address (see below) will be a good experience for me in the future.

## FAQ

### How did you come up with the name?

"State Manager" => "stateman" => more friendlier => "stateguy"

### Will you support feature X in the future?

Probably not. I made this mainly as a learning exercise, though of course if people actually start using it then I'd be willing to put some development time into it. I will not be interested in adding too many features, as StateGuy is aimed at people who are interested in minimalistic websites with fewer lines of code. If you want a state system with all the bells and whistles, you'd likely be better off with React and [Redux](https://react-redux.js.org/).

One thing I plan to add in the future is proper management of values that derive from other values, e.g. in a situation such as ``state.totalPeople = state.users + state.nonUsers``. The two operands should be updated first, and the dependent value should be calculated only after those have finished. This would require some kind of dependency tree for each state property, possibly stored in a private metadata object attached to the state object.