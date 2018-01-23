# An Introduction to Star Wars: Duels Of The Masters!
Duels is my first project involving JavaScript Objects. Each character has its own set of attributes, images, and SFX files. The original project guidelines required a single attack button which the user would press until the opponent is defeated; I decided that wasn’t much fun and included exponential character growth, defense stats, and health packs.

After an introduction to sound effects in the last project, I included many custom SFX interactions for Duels. Each character has their own unique voiceovers, as well as unique lightsaber on & off sounds. In addition, certain characters deliver different lines depending on who they are fighting; for example, Luke has a special line when he defeats Obi-Wan, and Vader has a special line if you use a health pack against him.

I’m quite proud of how this project came out, especially since I had only been working with JavaScript for 4 weeks when this was completed!

### How does it work?
This project simply uses local variables, arrays, and objects to store the game's state at any given time. Several random events will select 1 of 4 stages, and each stage has its own ambient background music. Each swing of your saber will double your attack power, leading to commanding finishes if you can survive long enough to use them. Health packs will restore your life, but they leave you open to an attack from the enemy. A combination of Bootstrap and custom CSS was used for most of the interactive graphic elements.

The sound effects are all loaded when the page is first opened so there is no delay when they are needed; this includes a different saber opening and retracting sound for each fighter, several lines of dialogue, and game over music. There are several hidden lines of dialogue, depending on which characters are fighting and what happens between them. Can you find them all?

### Who will use this?
Star Wars fans, casual gamers, and friends who like tinkering with small apps have all thoroughly enjoyed seeing the possibilities of this tech demo.

### What is the goal?
The primary goal was to become familiar with interactive Javascript elements; I took the exercise beyond that expectation and created an experience that was different each time it was loaded, and one that was responsive to different mobile layouts. I also wanted to make it more fun, as the original expectation was simply to press "Attack" until you either died or won.

# Deployment
The code can be used in most web servers; there is no required node or database requirement.

# Screenshot
![Screenshot](http://www.fullstacksteve.com/wp-content/uploads/2017/11/hero-starwars.png)

# Credits
Steve Marshall, Sole Developer
* [Steve's Online Portfolio](http://fullstacksteve.com/)
* [Steve's LinkedIn Profile](https://www.linkedin.com/in/sonoa/)