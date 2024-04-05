use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Architecture {
    #[key]
    player: ContractAddress,
    add_people: u256,
    lv: u256,
    mold: Mold,
}

#[derive(Serde, Copy, Drop, Introspect)]
enum Mold {
    Briq,
    Loot,
    Realms,
    CryptsAndCaverns,
}

