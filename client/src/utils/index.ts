export enum Mold {
    None = 0,
    Briq = 1,
    Loot = 2,
    Realms = 3,
    CryptsAndCaverns = 4
}

export const moldKeyMap : { [key in Mold]: string }  = {
    [Mold.None]: 'None',
    [Mold.Briq]: 'Briq',
    [Mold.Loot]: 'Loot',
    [Mold.Realms]: 'Realms',
    [Mold.CryptsAndCaverns]: 'CryptsAndCaverns'
};

export const moldImageMap : { [key in Mold]: string }  = {
    [Mold.None]: 'none.jpg',
    [Mold.Briq]: './img/architecture/briq.jpg',
    [Mold.Loot]: './img/architecture/loot.jpg',
    [Mold.Realms]: './img/architecture/realms.jpg',
    [Mold.CryptsAndCaverns]: './img/architecture/crypts_and_caverns.png'
};