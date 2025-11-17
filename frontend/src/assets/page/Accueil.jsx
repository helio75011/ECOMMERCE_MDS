import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4612';

export default function Accueil() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('all');
	const [sort, setSort] = useState('relevance'); // relevance | price-asc | price-desc

	useEffect(() => {
		let ignore = false;
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError('');
				const res = await fetch(`${API_BASE}/api/products`);
				if (!res.ok) {
					throw new Error(`Erreur API ${res.status}`);
				}
				const data = await res.json();
				if (!ignore) setProducts(Array.isArray(data) ? data : []);
			} catch (e) {
				if (!ignore) setError(e.message || 'Une erreur est survenue');
			} finally {
				if (!ignore) setLoading(false);
			}
		};

		fetchProducts();
		return () => {
			ignore = true;
		};
	}, []);

	const categories = useMemo(() => {
		const set = new Set(products.map(p => (p.category || 'general')));
		return ['all', ...Array.from(set).sort()];
	}, [products]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		let list = products.filter(p => p.isActive !== false);
		if (category !== 'all') list = list.filter(p => (p.category || 'general') === category);
		if (q) list = list.filter(p => (p.title || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
		if (sort === 'price-asc') list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		if (sort === 'price-desc') list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		return list;
	}, [products, query, category, sort]);

	return (
		<main className="w-full min-h-screen bg-neutral-50 text-neutral-900">
			<section className="mx-auto max-w-7xl px-4 py-10">
				<header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight">Catalogue</h2>
						<p className="text-sm text-neutral-500">Découvrez nos produits actifs</p>
					</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
						<div className="flex items-center gap-2">
							<input
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder="Rechercher un produit..."
								className="h-10 w-64 rounded-md border border-neutral-300 bg-white px-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
							/>
							<select
								value={category}
								onChange={e => setCategory(e.target.value)}
								className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
							>
								{categories.map(c => (
									<option key={c} value={c}>{c === 'all' ? 'Toutes les catégories' : c}</option>
								))}
							</select>
						</div>
						<div>
							<select
								value={sort}
								onChange={e => setSort(e.target.value)}
								className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
							>
								<option value="relevance">Pertinence</option>
								<option value="price-asc">Prix: croissant</option>
								<option value="price-desc">Prix: décroissant</option>
							</select>
						</div>
					</div>
				</header>

				{error && (
					<div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
						Erreur: {error}
					</div>
				)}

				{loading ? (
					<GridSkeleton />
				) : (
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filtered.map((p) => (
							<ProductCard key={p._id} product={p} />
						))}
						{!filtered.length && (
							<div className="col-span-full rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-500">
								Aucun produit trouvé.
							</div>
						)}
					</div>
				)}
			</section>
		</main>
	);
}

function ProductCard({ product }) {
	const { title, description, price, images, category } = product;
	const imgSrc = images?.[0] || 'https://via.placeholder.com/600x400?text=Produit';
	const priceLabel = typeof price === 'number' ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price) : '—';

	return (
		<article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
				<img
					src={imgSrc}
					alt={title}
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-2 p-4">
				<div className="flex items-start justify-between gap-2">
					<h3 className="line-clamp-2 text-base font-medium text-neutral-900">{title}</h3>
					<span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{priceLabel}</span>
				</div>
				{category && (
					<span className="w-fit rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">{category}</span>
				)}
				{description && (
					<p className="line-clamp-2 text-sm text-neutral-600">{description}</p>
				)}
				<div className="mt-2 flex items-center gap-2">
					<button className="h-9 flex-1 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white transition hover:bg-neutral-800">
						Voir le produit
					</button>
					<button
						title="Ajouter à la wishlist"
						className="h-9 w-9 rounded-md border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50"
					>
						❤
					</button>
				</div>
			</div>
		</article>
	);
}

function GridSkeleton() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
					<div className="aspect-[4/3] animate-pulse bg-neutral-200" />
					<div className="space-y-3 p-4">
						<div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
						<div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200" />
						<div className="h-10 w-full animate-pulse rounded bg-neutral-200" />
					</div>
				</div>
			))}
		</div>
	);
}

