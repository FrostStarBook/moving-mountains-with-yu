import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

enum Mold {
    Briq,
    Loot,
    Realms,
    CryptsAndCaverns,
}

export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Architecture, Base, People }: ClientComponents
) {
    const spawn = async (account: AccountInterface) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        const architectureId = uuid();
        Architecture.addOverride(architectureId, {
            entity: entityId,
            value: { player: BigInt(entityId), add_people: BigInt(100), lv: BigInt(1), mold: Mold.Briq },
        });

        const baseId = uuid();
        Base.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: BigInt(5),
                lv: BigInt(1),
            },
        });

        const peopleId = uuid();
        People.addOverride(peopleId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                people_count: BigInt(1),
            },
        });

        try {
            const { transaction_hash } = await client.actions.spawn({
                account,
            });

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
            Architecture.removeOverride(architectureId);
            Base.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            People.removeOverride(peopleId);
        }
    };

    const click = async (account: AccountInterface) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        const architectureId = uuid();
        Architecture.addOverride(architectureId, {
            entity: entityId,
            value: {
                player: BigInt(entityId), add_people: getComponentValue(Architecture, entityId)?.add_people,
                lv: getComponentValue(Architecture, entityId)?.lv, mold: getComponentValue(Architecture, entityId)?.mold
            },
        });

        const baseId = uuid();
        Base.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(Base, entityId)?.add_people,
                lv: getComponentValue(Base, entityId)?.lv,
            },
        });

        const peopleId = uuid();
        People.addOverride(peopleId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                people_count: getComponentValue(People, entityId)?.people_count,
            },
        });

        try {
            const { transaction_hash } = await client.actions.click({
                account,
            });

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
            Architecture.removeOverride(architectureId);
            Base.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            Base.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    return {
        spawn,
        click,
    };
}
