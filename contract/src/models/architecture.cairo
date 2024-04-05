use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Architecture {
    #[key]
    player: ContractAddress,
    add_people: u256,
    lv: u256,
    mold: u8,
}
