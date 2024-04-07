import { overridableComponent } from "@dojoengine/recs";
import { ContractComponents } from "./generated/contractComponents";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
    contractComponents,
}: {
    contractComponents: ContractComponents;
}) {
    return {
        ...contractComponents,
        People: overridableComponent(contractComponents.People),
        BaseClick: overridableComponent(contractComponents.BaseClick),
        Architecture: overridableComponent(contractComponents.Architecture),
    };
}
