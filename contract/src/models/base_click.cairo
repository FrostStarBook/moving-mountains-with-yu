use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct BaseClick {
    #[key]
    player: ContractAddress,
    add_people: u256,
    lv: u256,
}

