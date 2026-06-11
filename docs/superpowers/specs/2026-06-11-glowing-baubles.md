# Specification: Swiss Editorial "Glowing Glass Baubles" with Tiny Light Sources

## Goal
Implement high-fidelity, glowing, glassy 3D spheres (baubles) containing tiny, intense interior point lights inside both the **3D City Card** (`CityEnvironment.tsx`) and the **Paper Airplane Flight Window** (`TechSection.tsx`), inspired by the premium `bestservedbold-christmas-baubles` glossy rendering style.

## Design & Physical Rendering Details
- **Glassy Sphere Shader/Material (`GlowingBauble`):**
  - Rendered using Three.js standard `<meshPhysicalMaterial>` to create a hyper-realistic, glistening glass effect:
    - **Transmission:** `0.6` (for glass transparency and light refraction).
    - **IOR (Index of Refraction):** `1.5` (optical glass standard).
    - **Roughness:** `0.1` (for high-gloss reflections).
    - **Metalness:** `0.9` (adds premium metallic/chrome sheen).
    - **Clearcoat & ClearcoatRoughness:** `1.0` / `0.1` (adds a polished, glossy protective outer shell).
  - **Tiny Interior Light Source:**
    - Nest a `<pointLight>` directly inside the sphere's geometric center.
    - Match light color with the sphere's theme hue, setting `intensity={2.5}` and `distance={3.5}` to cast rich, soft glows on adjacent wireframe meshes.
- **Card D 3D City Integration (`CityEnvironment.tsx`):**
  - Add 3 floating energy baubles orbiting/bobbing above the wireframe skyscrapers:
    - **Bauble 1 (Ebikawa Blue - `#1F438A`):** Position `[-0.8, 0.4, -0.6]`, size `0.18`.
    - **Bauble 2 (Classic Red - `#C82833`):** Position `[0.7, 0.2, 0.5]`, size `0.15`.
    - **Bauble 3 (Antenna Yellow - `#F0A828`):** Position `[0.4, 0.5, -0.8]`, size `0.12`.
- **Tech Section Paper Airplane Integration (`TechSection.tsx`):**
  - Add 2 floating glass baubles near the airplane's flight path:
    - **Bauble A (Ebikawa Blue - `#1F438A`):** Position `[-0.6, 0.2, -0.4]`, size `0.16`.
    - **Bauble B (Antenna Yellow - `#F0A828`):** Position `[0.6, -0.2, 0.4]`, size `0.12`.
