type ClassMethod = (...args: unknown[]) => unknown;
type ClassConstructor = new (...args: unknown[]) => unknown;

export function logStep<T extends ClassConstructor>(target: T): T {
    const originalConstructor = target;

    function construct(constructor: T, args: unknown[]): unknown {
        const instance = new constructor(...args);
        return instance;
    }

    const newConstructor = function (this: unknown, ...args: unknown[]) {
        return construct(originalConstructor, args);
    };

    newConstructor.prototype = originalConstructor.prototype;
    return newConstructor as unknown as T;
}

export function logStepMethod(
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const originalMethod = descriptor.value as ClassMethod;

    if (typeof originalMethod !== 'function') {
        console.warn(
            `@logStep can only be applied to methods. Skipping ${target?.constructor?.name ?? 'unknown'}.`,
        );
        return descriptor;
    }

    descriptor.value = async function (this: unknown, ...args: unknown[]): Promise<unknown> {
        const className = this?.constructor?.name ?? 'UnknownClass';
        const methodName = propertyKey;
        const argsString = args.map((a) => JSON.stringify(a)).join(', ');

        console.log(`[${className}] ${methodName}(${argsString})`);
        try {
            const result = await originalMethod.apply(this, args);
            console.log(`[${className}] ${methodName} -> ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            console.error(`[${className}] ${methodName} -> Error: ${error}`);
            throw error;
        }
    };

    return descriptor;
}
