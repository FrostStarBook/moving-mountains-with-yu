# moving-mountains-with-yu

The inspiration for this game comes from a casual idle game on Steam: Cookie Clicker(https://store.steampowered.com/app/1454400/Cookie_Clicker/).

With the upgrades of 4844, the gas consumption has become extremely low. Moreover, if you use Katana for L3, the gas will be even lower. Thanks to Katana's fast on-chain speed, I did not use a record reading method in game design. All population increases are completed through chain interaction, which also conforms to the background setting of the game's story: "The Foolish Old Man Removes the Mountains."

The unit of production is Blobert, which represents the population generated with each click. This is a virtual world, so there's no rigid generation of people.

Once upon a time, there were two large mountains - Taihang Mountain and Wangwu Mountain, which sat in front of an old man Yu’s house. Because the mountains blocked the way, the Yu’s families had to walk many extra miles in order to go out. One day, Yu called together the whole family to discuss removing the mountains. His wife shook her head and said：“Where are we going to put the earth and sand we dug out?”The others said：“We can dump it in the sea.”

The background story is based on a proverb.
---

The next day in the early morning, Yu began digging the mountain with his families. An old man called Zhi Sou saw them working and laughed: "Mr. Fool, you're so old and weak. Why do you want to remove the mountains? You won’t be able to remove it even before you die!" Yu smiled and said:”Your mind is so stubborn and old. If I die, there will be my sons. Sons will have grandsons and grandsons will have sons. There will be no end, but the mountain will not grow. As time goes on, the mountains will be removed one day!” Zhi Sou said nothing and left.
---

Proverb 愚公移山 literally means "Mr. Fool Wants to Move the Mountain". The story tells us: with persistence and determination, any difficulties, even big ones can be solved.
--- 


The gameplay involves producing offspring by clicking on houses. You can increase the number of offspring per click by consuming population upgrades or by purchasing totems (each totem consumes different populations for purchase and requires certain strategies for upgrades).

I completed this game entirely on my own. The game's assets were generated using StableDiffusion and created from scratch using Dojo from 0 to 1 in three days.

The Background Image - '愚公移山' by Xu Beihong
https://artsandculture.google.com/asset/%E6%84%9A%E5%85%AC%E7%A7%BB%E5%B1%B1/8wFAHt3ehNYGZw?hl=zh-CN

Some features are still incomplete, such as leaderboards, the ability for players to purchase and upgrade 'beasts,' attacks from players themselves (where players actively attack, leading to a decrease in population), and more upgrade strategies.

In summary, this is a fully on-chain game, perfect for playing during work breaks.



## Quick start
### run contract：

```
dojoup

cd contract

katana --disable-fee

sozo build

sozo migrate apply

torii --world $WORLD_ADDRESS
```
### Execute script to grant contract operation permission
```
cd contract/scripts 

sh default_auth.sh 
sh spawn.sh
```

### Test
```
 sozo test
```

### run client
```
cd client
yarn
yarn dev
```

open browser:
http://localhost:5173/home

Enjoy your game!


### Game Guide
Upgrade population cost in baseClick = baseClick level x 10
Population increase per upgrade click: 5

The price and upgrade cost of totems:

| Totem            | Purchase Cost  | Population Increase per Second |
| ---------------- | -------------- | ------------------------------ |
| CryptsAndCaverns | 10,000         | 500                            |
| Loot             | 1,000,000      | 50,000                         |
| Realms           | 100,000,000    | 5,000,000                      |
| Bloberts         | 10,000,000,000 | 500,000,000                    |

The cost of each totem upgrade = Totem level x Population increase per second by the totem


Each upgrade increases the population by twice the previous population increase.


