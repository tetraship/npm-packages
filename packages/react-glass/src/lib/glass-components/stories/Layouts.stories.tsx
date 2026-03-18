import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	ApplicationLayout,
	ApplicationLayoutNav,
	Breadcrumbs,
	GlassButton,
	GlassButtonLink,
	GlassCard,
	GlassCardContent,
	GlassCardDescription,
	GlassCardFooter,
	GlassCardHeader,
	GlassCardTitle,
	GlassInput,
	GlassNav,
	GlassSelect,
} from "../index";

const meta: Meta = {
	title: "Glass Components/Layouts",
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj;

const navOptions = [
	{ value: "home", label: "Home" },
	{ value: "blog", label: "Blog" },
	{ value: "about", label: "About" },
	{ value: "contact", label: "Contact" },
];

// ---------------------------------------------------------------------------
// SignInForm
// ---------------------------------------------------------------------------

export const SignInForm: Story = {
	render: () => (
		<div className="flex min-h-screen items-center justify-center p-8">
			<GlassCard className="w-full max-w-sm">
				<GlassCardHeader>
					<GlassCardTitle>Sign In</GlassCardTitle>
					<GlassCardDescription>
						Enter your credentials to access your account.
					</GlassCardDescription>
				</GlassCardHeader>
				<GlassCardContent>
					<form className="space-y-4">
						<div>
							<label htmlFor="email" className="mb-1 block text-sm font-medium">
								Email
							</label>
							<GlassInput
								id="email"
								type="email"
								placeholder="you@example.com"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="mb-1 block text-sm font-medium"
							>
								Password
							</label>
							<GlassInput
								id="password"
								type="password"
								placeholder="••••••••"
							/>
						</div>
					</form>
				</GlassCardContent>
				<GlassCardFooter className="flex flex-col gap-2">
					<GlassButton variant="primary" className="w-full">
						Sign In
					</GlassButton>
					<GlassButtonLink
						href="/forgot-password"
						className="text-center text-sm"
					>
						Forgot password?
					</GlassButtonLink>
				</GlassCardFooter>
			</GlassCard>
		</div>
	),
};

// ---------------------------------------------------------------------------
// BlogIndex
// ---------------------------------------------------------------------------

const blogPosts = [
	{
		id: "1",
		title: "Getting Started with Glassmorphism",
		excerpt:
			"Learn how to create beautiful glass-effect UIs using Tailwind CSS and the react-glass design system.",
		date: "March 10, 2026",
		tag: "Design",
	},
	{
		id: "2",
		title: "Building Accessible Components",
		excerpt:
			"Accessibility is a first-class concern. This post walks through ARIA patterns used in react-glass.",
		date: "March 5, 2026",
		tag: "Accessibility",
	},
	{
		id: "3",
		title: "Monorepo Patterns with pnpm",
		excerpt:
			"How we structure our npm packages monorepo for maximum code sharing and minimal duplication.",
		date: "February 28, 2026",
		tag: "DevOps",
	},
];

export const BlogIndex: Story = {
	render: () => (
		<ApplicationLayout
			header="Tetraship Blog"
			nav={
				<ApplicationLayoutNav
					options={navOptions}
					activeValue="blog"
					onSelect={() => {}}
				/>
			}
		>
			<div className="space-y-6">
				<Breadcrumbs
					items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
				/>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{blogPosts.map((post) => (
						<GlassCard key={post.id}>
							<GlassCardHeader>
								<span className="text-xs font-semibold uppercase tracking-wider opacity-60">
									{post.tag}
								</span>
								<GlassCardTitle className="mt-1">{post.title}</GlassCardTitle>
								<GlassCardDescription>{post.excerpt}</GlassCardDescription>
							</GlassCardHeader>
							<GlassCardFooter className="flex items-center justify-between">
								<span className="text-xs opacity-50">{post.date}</span>
								<GlassButtonLink
									href={`/blog/${post.id}`}
									className="text-sm font-medium"
								>
									Read more →
								</GlassButtonLink>
							</GlassCardFooter>
						</GlassCard>
					))}
				</div>
			</div>
		</ApplicationLayout>
	),
};

// ---------------------------------------------------------------------------
// EntityDetail
// ---------------------------------------------------------------------------

const entityNavItems = [
	{ label: "Overview", href: "#overview" },
	{ label: "Activity", href: "#activity" },
	{ label: "Settings", href: "#settings" },
];

export const EntityDetail: Story = {
	render: () => (
		<ApplicationLayout
			header="Project Alpha"
			nav={
				<ApplicationLayoutNav
					options={navOptions}
					activeValue="home"
					onSelect={() => {}}
				/>
			}
		>
			<div className="space-y-6">
				<Breadcrumbs
					items={[
						{ label: "Home", href: "/" },
						{ label: "Projects", href: "/projects" },
						{ label: "Project Alpha" },
					]}
				/>

				<div className="flex flex-col gap-6 lg:flex-row">
					{/* Side navigation */}
					<aside className="w-full lg:w-48 shrink-0">
						<GlassNav>
							<nav className="flex flex-col gap-1 p-2">
								{entityNavItems.map((item) => (
									<a
										key={item.href}
										href={item.href}
										className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
									>
										{item.label}
									</a>
								))}
							</nav>
						</GlassNav>
					</aside>

					{/* Main content */}
					<div className="flex-1 space-y-4">
						<GlassCard>
							<GlassCardHeader>
								<GlassCardTitle>Overview</GlassCardTitle>
								<GlassCardDescription>
									Project Alpha is a flagship initiative delivering
									next-generation glassmorphic user interfaces.
								</GlassCardDescription>
							</GlassCardHeader>
							<GlassCardContent>
								<dl className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<dt className="opacity-60">Status</dt>
										<dd className="font-medium">Active</dd>
									</div>
									<div>
										<dt className="opacity-60">Owner</dt>
										<dd className="font-medium">Tetraship</dd>
									</div>
									<div>
										<dt className="opacity-60">Started</dt>
										<dd className="font-medium">Jan 2026</dd>
									</div>
									<div>
										<dt className="opacity-60">Due</dt>
										<dd className="font-medium">Jun 2026</dd>
									</div>
								</dl>
							</GlassCardContent>
							<GlassCardFooter className="flex gap-2">
								<GlassButton variant="primary">Edit</GlassButton>
								<GlassButton variant="secondary">Archive</GlassButton>
							</GlassCardFooter>
						</GlassCard>
					</div>
				</div>
			</div>
		</ApplicationLayout>
	),
};

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------

const tableData = [
	{
		id: 1,
		name: "Alice Johnson",
		role: "Admin",
		status: "Active",
		joined: "Jan 3, 2026",
	},
	{
		id: 2,
		name: "Bob Smith",
		role: "Editor",
		status: "Active",
		joined: "Jan 15, 2026",
	},
	{
		id: 3,
		name: "Carol White",
		role: "Viewer",
		status: "Inactive",
		joined: "Feb 1, 2026",
	},
	{
		id: 4,
		name: "David Lee",
		role: "Editor",
		status: "Active",
		joined: "Feb 20, 2026",
	},
	{
		id: 5,
		name: "Eve Martin",
		role: "Admin",
		status: "Active",
		joined: "Mar 5, 2026",
	},
];

export const DataTable: Story = {
	render: () => (
		<ApplicationLayout
			header="User Management"
			nav={
				<ApplicationLayoutNav
					options={navOptions}
					activeValue="home"
					onSelect={() => {}}
				/>
			}
		>
			<div className="space-y-4">
				<Breadcrumbs
					items={[{ label: "Home", href: "/" }, { label: "Users" }]}
				/>

				{/* Filters toolbar */}
				<GlassCard padded>
					<div className="flex flex-wrap items-end gap-3">
						<div className="flex-1 min-w-40">
							<label
								htmlFor="search"
								className="mb-1 block text-sm font-medium"
							>
								Search
							</label>
							<GlassInput
								id="search"
								placeholder="Search users…"
								intensity="light"
							/>
						</div>
						<div className="w-40">
							<label
								htmlFor="role-filter"
								className="mb-1 block text-sm font-medium"
							>
								Role
							</label>
							<GlassSelect id="role-filter" intensity="light">
								<option value="">All roles</option>
								<option value="admin">Admin</option>
								<option value="editor">Editor</option>
								<option value="viewer">Viewer</option>
							</GlassSelect>
						</div>
						<div className="w-40">
							<label
								htmlFor="status-filter"
								className="mb-1 block text-sm font-medium"
							>
								Status
							</label>
							<GlassSelect id="status-filter" intensity="light">
								<option value="">All statuses</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</GlassSelect>
						</div>
					</div>
				</GlassCard>

				{/* Table */}
				<GlassCard padded={false}>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/10">
									<th className="px-4 py-3 text-left font-semibold opacity-70">
										Name
									</th>
									<th className="px-4 py-3 text-left font-semibold opacity-70">
										Role
									</th>
									<th className="px-4 py-3 text-left font-semibold opacity-70">
										Status
									</th>
									<th className="px-4 py-3 text-left font-semibold opacity-70">
										Joined
									</th>
									<th className="px-4 py-3 text-left font-semibold opacity-70">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((row) => (
									<tr
										key={row.id}
										className="border-b border-white/5 hover:bg-white/5"
									>
										<td className="px-4 py-3 font-medium">{row.name}</td>
										<td className="px-4 py-3 opacity-80">{row.role}</td>
										<td className="px-4 py-3">
											<span
												className={
													row.status === "Active"
														? "rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium"
														: "rounded-full bg-error/20 px-2 py-0.5 text-xs font-medium"
												}
											>
												{row.status}
											</span>
										</td>
										<td className="px-4 py-3 opacity-60">{row.joined}</td>
										<td className="px-4 py-3">
											<GlassButton variant="tertiary" size="small">
												Edit
											</GlassButton>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</GlassCard>
			</div>
		</ApplicationLayout>
	),
};
