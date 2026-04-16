# Homepage Patch — app/page.jsx

Two surgical edits. Open `app/page.jsx` in GitHub's web editor (pencil icon),
apply both, commit.

---

## EDIT 1 — Remove duplicate 4th hero video

**FIND** (near the top of the file, in the `VIDEOS` array):

```jsx
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero3.mp4',
    poster: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1800&q=80',
    label: 'Santa Monica',
  },
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero3.mp4',
    poster: 'https://images.unsplash.com/photo-1543328023-cd0b8ff72739?w=1800&q=80',
    label: 'Beverly Hills',
  },
];
```

**REPLACE WITH**:

```jsx
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero3.mp4',
    poster: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1800&q=80',
    label: 'Santa Monica',
  },
];
```

(The "Beverly Hills" object is the duplicate — it points to the same hero3.mp4
as the Santa Monica entry. Deleting it drops the rotation to 3 unique videos.)

---

## EDIT 2 — Fix New Listings top-nav link

Press `/` in GitHub's file view to open find-in-file. Search for:

```
#listings
```

You'll find ONE occurrence in the top nav (the other "New Listings" link,
which already points to `/new-listings`, stays as is).

**CHANGE**:

```jsx
href="#listings"
```

**TO**:

```jsx
href="/new-listings"
```

---

Commit message: `fix: remove duplicate hero video, route New Listings nav to /new-listings`

Vercel will auto-deploy on push.
