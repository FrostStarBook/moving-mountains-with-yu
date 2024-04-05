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
    None,
    Briq,
    Loot,
    Realms,
    CryptsAndCaverns,
}

impl DirectionIntoFelt252 of Into<Mold, felt252> {
    fn into(self: Mold) -> felt252 {
        match self {
            Mold::None => 0,
            Mold::Briq => 1,
            Mold::Loot => 2,
            Mold::Realms => 3,
            Mold::CryptsAndCaverns => 4,
        }
    }
}
