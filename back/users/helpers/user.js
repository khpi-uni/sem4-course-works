export const omitPassword = (user) => {
    if (typeof user !== 'object') {
        return null;
    }

    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}