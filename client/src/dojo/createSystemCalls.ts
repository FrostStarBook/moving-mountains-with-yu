import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";
import { Mold } from "../utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;


export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Architecture, BaseClick, People }: ClientComponents
) {
    const spawn = async (account: AccountInterface) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        const architectureId = uuid();
        Architecture.addOverride(architectureId, {
            entity: entityId,
            value: { player: BigInt(entityId), add_people: BigInt(1), lv: BigInt(1), mold: Mold.None },
        });

        const baseId = uuid();
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: BigInt(1),
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
            BaseClick.removeOverride(baseId);
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
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(BaseClick, entityId)?.add_people,
                lv: getComponentValue(BaseClick, entityId)?.lv,
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
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    const upgrade_base = async (account: AccountInterface) => {
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
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(BaseClick, entityId)?.add_people,
                lv: getComponentValue(BaseClick, entityId)?.lv,
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
            const { transaction_hash } = await client.actions.upgrade_base({
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
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    const buy_architecture = async (account: AccountInterface, mold: number) => {
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
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(BaseClick, entityId)?.add_people,
                lv: getComponentValue(BaseClick, entityId)?.lv,
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
            const { transaction_hash } = await client.actions.buy_architecture({
                account, mold
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
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    const upgrade_architecture = async (account: AccountInterface) => {
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
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(BaseClick, entityId)?.add_people,
                lv: getComponentValue(BaseClick, entityId)?.lv,
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
            const { transaction_hash } = await client.actions.upgrade_architecture({
                account
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
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    const auto = async (account: AccountInterface) => {
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
        BaseClick.addOverride(baseId, {
            entity: entityId,
            value: {
                player: BigInt(entityId),
                add_people: getComponentValue(BaseClick, entityId)?.add_people,
                lv: getComponentValue(BaseClick, entityId)?.lv,
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
            const { transaction_hash } = await client.actions.auto({
                account
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
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        } finally {
            Architecture.removeOverride(architectureId);
            BaseClick.removeOverride(baseId);
            People.removeOverride(peopleId);
        }
    };

    return {
        spawn,
        click,
        upgrade_base,
        buy_architecture,
        upgrade_architecture,
        auto
    };
}
