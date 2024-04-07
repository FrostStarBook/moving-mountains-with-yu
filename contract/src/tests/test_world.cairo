#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import test utils
    use moving_mountains_with_yu::{
        models::{
            base_click::{BaseClick, base_click}, people::{People, people},
            architecture::{Architecture, architecture}
        },
        systems::{actions::{actions, IActionsDispatcher, IActionsDispatcherTrait}},
    };

    #[test]
    #[available_gas(30000000)]
    fn test_click() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![base_click::TEST_CLASS_HASH, people::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        // call spawn()
        actions_system.spawn();

        actions_system.click();

        // Check world state
        let people = get!(world, caller, People);

        // check click
        assert(people.people_count == 1, 'click 1 is wrong');

        actions_system.click();

        // Check world state
        let people_2 = get!(world, caller, People);
        // check click
        assert(people_2.people_count == 2, 'click 2 is wrong');
    }
}
