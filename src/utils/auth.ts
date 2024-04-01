import { useUserStore } from '@/store/userStore'
type permissionsType = Array<string>
type permissionType = string | Array<string>

function authPermission(permission: permissionType) {
	const store = useUserStore()
	const allPermission = '*:*:*'
	const permissions = store.$state.permissions
	if (permission?.length > 0) {
		return permissions.some(function (v: string[] | string) {
			return allPermission === v || v === permission
		})
	} else {
		return false
	}
}

const authRole = (role: permissionType): boolean => {
	const store = useUserStore()
	const superAdmin = 'admin'
	const roles = store.$state.roles
	if (role && role.length > 0) {
		return roles.some((v: string | string[]) => {
			return superAdmin === v || v === role
		})
	} else {
		return false
	}
}

export default {
	// 验证用户是否具备某权限
	hasPermi(permission: permissionsType): boolean {
		return authPermission(permission)
	},
	// 验证用户是否含有指定权限，只需包含其中一个
	hasPermiOr(permissions: permissionsType): boolean {
		return permissions.some(item => {
			return authPermission(item)
		})
	},
	// 验证用户是否含有指定权限，必须全部拥有
	hasPermiAnd(permissions: permissionsType): boolean {
		return permissions.every(item => {
			return authPermission(item)
		})
	},
	// 验证用户是否具备某角色
	hasRole(role: permissionsType): boolean {
		return authRole(role)
	},
	// 验证用户是否含有指定角色，只需包含其中一个
	hasRoleOr(roles: permissionsType): boolean {
		return roles.some(item => {
			return authRole(item)
		})
	},
	// 验证用户是否含有指定角色，必须全部拥有
	hasRoleAnd(roles: permissionsType): boolean {
		return roles.every(item => {
			return authRole(item)
		})
	}
}
