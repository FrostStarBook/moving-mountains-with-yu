use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Weapon {
    #[key]
    player: ContractAddress,
    subtract_people: u256,
    lv: u256,
    weapon_type: u8,
}
