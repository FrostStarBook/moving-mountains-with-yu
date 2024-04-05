use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct People {
    #[key]
    player: ContractAddress,
    people_count: u256,
}

