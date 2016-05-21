[![Stories in Ready](https://badge.waffle.io/Isigiel/minecraft.js.svg?label=ready&title=Ready)](http://waffle.io/Isigiel/minecraft.js)
![Stories in Ready](https://david-dm.org/Isigiel/minecraft.js.svg)

# minecraft.js
Launching minecraft, with JavaScript :O

### Current Features
_minecraft.js in this phase is pretty much good for nothing, I'll still list what works atm here_
* Minecraft authentication and saving the credentials for future starts
* Loading a pack via the technicpack.net api
* Downloading mods for a solder based pack (about 50% faster then the technic launcher)
* Downloading vanilla libraries for mc-version and system
* Persistent storage for launcher data

### Tech Stack
* Building with webpack
* Running the launcher with electron
* ES2015 for the angular app and new 1.5 component style
* Also use of the new angular component router
* Open questions are distribution and installation/updating

### Goals
* Make an easily hackable minecraft-launcher with javascript
* Use the technicpack.net api for modpack installation *(others to follow)*
* Allow the use of themes and preset setting/modapcks *(so others can brand the launcher without creating oh so many forks)*
* Implement new tech that's not yet used in the minecraft(launcher) world

### Contributing
Although I'm fairly sure I can pull this of, all help is appreciated. If you don't are the developing kind of person, please give your input in the [issues](https://github.com/Isigiel/minecraft.js/issues) / [on waffle](http://waffle.io/Isigiel/minecraft.js).

If you want to contribute code-wise, just fork the project and pull request after you made your changes.

Most of work for me is the node.js part of the app, (handling file downloads / caching / launching mc).

If you want more info or discuss your own ideas in person meet me [on Discord](https://discord.gg/0mcxjLzitV1s14iP)