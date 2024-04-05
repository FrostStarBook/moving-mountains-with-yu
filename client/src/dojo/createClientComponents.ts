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
        Base: overridableComponent(contractComponents.Base),
        Architecture: overridableComponent(contractComponents.Architecture),
    };
}
