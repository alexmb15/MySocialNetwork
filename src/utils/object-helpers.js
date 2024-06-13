export const updateObjectInArray = (items, itemId, objectPropName, newObjectProps) => {
    return items.map(user => {
        if (user[objectPropName] === itemId) {
            return {...user, ...newObjectProps}
        }
        return user;
    })
}
