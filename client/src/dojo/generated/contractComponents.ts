/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>;

export function defineContractComponents(world: World) {
    return {
        Architecture: (() => {
            return defineComponent(
                world,
                { player: RecsType.BigInt, add_people: RecsType.BigInt, lv: RecsType.BigInt, mold: RecsType.Number },
                {
                    metadata: {
                        name: "Architecture",
                        types: ["contractaddress", "u256", "u256", "u8"],
                        customTypes: [],
                    },
                }
            );
        })(),
        BaseClick: (() => {
            return defineComponent(
                world,
                { player: RecsType.BigInt, add_people: RecsType.BigInt, lv: RecsType.BigInt },
                {
                    metadata: {
                        name: "BaseClick",
                        types: ["contractaddress", "u256", "u256"],
                        customTypes: [],
                    },
                }
            );
        })(),
        People: (() => {
            return defineComponent(
                world,
                { player: RecsType.BigInt, people_count: RecsType.BigInt },
                {
                    metadata: {
                        name: "People",
                        types: ["contractaddress", "u256"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
