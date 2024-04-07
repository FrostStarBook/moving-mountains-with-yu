use moving_mountains_with_yu::models::{people::People, architecture::Architecture};


// define the interface
#[dojo::interface]
trait IActions<TContractState> {
    fn spawn();
    fn click();
    fn upgrade_base();
    fn buy_architecture(mold: u8);
    fn upgrade_architecture();
    fn auto();
    fn buy_weapon(weapon_type: u8);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions, buy_architecture_innner};

    use starknet::{ContractAddress, get_caller_address};
    use moving_mountains_with_yu::models::{
        base_click::BaseClick, people::People, architecture::Architecture, weapon::Weapon,
    };

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(world: IWorldDispatcher) {

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // Update the world state with the new data.
            set!(
                world,
                (
                    BaseClick { player, add_people: 1, lv: 1 },
                    Architecture { player, add_people: 0, lv: 0, mold: 0 },
                )
            );
        }

        fn click(world: IWorldDispatcher) {

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut baseClick, mut people) = get!(world, player, (BaseClick, People));

            // Increase by base level
            people.people_count += baseClick.add_people;

            set!(world, (people));

        }

        fn upgrade_base(world: IWorldDispatcher) {

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut baseClick, mut people) = get!(world, player, (BaseClick, People));

            // The specified people need to be consumed to upgrade the base
            people.people_count -= baseClick.lv * 10;
            baseClick.lv += 1;
            baseClick.add_people += 5;

            set!(world, (people, baseClick));
        }

        fn buy_architecture(world: IWorldDispatcher, mold: u8) {

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut architecture, mut people) = get!(world, player, (Architecture, People));

            // The purchase of different buildings requires the corresponding consumption of people
            let (p, a) = buy_architecture_innner(mold, people, architecture);

            set!(world, (p, a));


        }

        fn upgrade_architecture(world: IWorldDispatcher) {
        

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut architecture, mut people) = get!(world, player, (Architecture, People));

            // Upgrading a building requires a specified number of people
            people.people_count -= architecture.lv * architecture.add_people;
            architecture.lv += 1;
            architecture.add_people += architecture.add_people;
        
            set!(world, (people, architecture));
        }

        fn auto(world: IWorldDispatcher) {

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut architecture, mut people) = get!(world, player, (Architecture, People));

            people.people_count += architecture.add_people;

            set!(world, (people));

        }

        fn buy_weapon(weapon_type: u8) {// TODO Provides weapon purchases and upgrades based on unused available components, such as Beasts in LS

        }
    }
}

// CryptsAndCaverns = 1,
// Loot = 2,
// Realms = 3,
// Bloberts = 4
fn buy_architecture_innner(
    mold: u8, mut people: People, mut architecture: Architecture
) -> (People, Architecture) {
    if mold == 1 {
        people.people_count -= 10000;
        architecture.mold = mold;
        architecture.lv = 1;
        architecture.add_people = 500;
    } else if mold == 2 {
        people.people_count -= 1000000;
        architecture.mold = mold;
        architecture.lv = 1;
        architecture.add_people = 50000;
    } else if mold == 3 {
        people.people_count -= 100000000;
        architecture.mold = mold;
        architecture.lv = 1;
        architecture.add_people = 5000000;
    } else if mold == 4 {
        people.people_count -= 10000000000;
        architecture.mold = mold;
        architecture.lv = 1;
        architecture.add_people = 500000000;
    }
    (people, architecture)
}
