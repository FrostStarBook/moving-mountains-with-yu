// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState);
    fn click(self: @TContractState);
// fn upgrade_base(self: @TContractState, base: moving_mountains_with_yu::models::base::Base);
// fn buy_architecture(
//     self: @TContractState, architecture: moving_mountains_with_yu::models::architecture::Architecture
// );
// fn upgrade_architecture(
//     self: @TContractState, architecture: moving_mountains_with_yu::models::architecture::Architecture
// );
// fn auto(self: @TContractState);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::IActions;

    use starknet::{ContractAddress, get_caller_address};
    use moving_mountains_with_yu::models::{
        base::Base, people::People, architecture::{Architecture, Mold}
    };

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Peopled: Peopled,
    }

    #[derive(Drop, starknet::Event)]
    struct Peopled {
        player: ContractAddress,
        people_count: u256,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(self: @ContractState) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // 获取基础点击数值
            let base = get!(world, player, (Base));

            // 获取基础建筑
            let architecture = get!(world, player, (Architecture));

            // Update the world state with the new data.
            set!(
                world,
                (
                    Base { player, add_people: 1, lv: 1 },
                    Architecture { player, add_people: 10, lv: 1, mold: Mold::Briq },
                )
            );
        }

        fn click(self: @ContractState) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let (mut base, mut people) = get!(world, player, (Base, People));

            // 按照base 等级增加
            people.people_count += base.add_people;
            let people_count = people.people_count;

            set!(world, (people));

            emit!(world, Peopled { player, people_count });
        }
    }
}
