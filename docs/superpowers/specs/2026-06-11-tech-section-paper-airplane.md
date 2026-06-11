# Specification: Swiss Minimalist "3D Flight City & Clouds" Timeline

## Goal
Implement a slow-scrolling 3D wireframe cloud mesh system inside the Tech/Career section's paper airplane Canvas (`TechSection.tsx`) floating elegantly above the skyscrapers. The paper airplane will glide gracefully, bypassing both scrolling skyscrapers and procedurally scrolling low-poly clouds!

## Design Details
- **3D Wireframe Clouds (`LowPolyCloud`):**
  - Implement a `LowPolyCloud` sub-component constructed out of clusters of overlapping spheres (1 central core sphere and 3 surrounding side/top puffs) to form fluffy, simplified, low-poly wireframe clouds.
  - Set the wireframe material to a highly transparent mecha-blue `#1F438A` (opacity 0.06) to evoke floating blueprint structures.
  - In `useFrame`, scroll the clouds along the +Z axis towards the camera (`position.z += speed * delta`) just like the buildings, recycling them back to the horizon (`position.z = -7.5`) on completion.
  - Spawn 2 separate clouds at higher elevations (e.g. `Y = 0.7` and `Y = 0.8`) to orbit cleanly above the building rooftops.
- **Left Column (Minimalist Timeline):**
  - Keep the vertical axis line, yellow dot indicators, massive job title headers, larger company name subtitles, and description blocks perfectly intact.
