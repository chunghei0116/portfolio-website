# img2threejs pipeline results

All skill scripts were invoked with `python3.12` because the system Python is 3.9.

1. `forge/next.py artifacts/hiking-stick/hiking-stick-sculpt-spec.json` initially failed as expected because no spec existed yet.
2. `forge/stage1_intake/probe_image.py public/hiking-stick-reference.png` passed technical probing.
3. `forge/stage1_intake/check_reference_admission.py public/hiking-stick-reference.png` admitted the source.
4. `forge/stage2_spec/new_pre_spec_assessment.py ...` was blocked by the installed skill's unwritable `.cache/spec-search/core_3d.json` directory. The command did not write an assessment; direct visual assessment is in `technical-intake.md`.
5. `forge/stage1_intake/build_detail_inventory.py ...` created `detail-inventory.json` and nine zone crops.
6. `forge/stage2_spec/new_sculpt_spec.py ...` created `hiking-stick-sculpt-spec.json`.
7. `forge/stage1_intake/extract_pbr_evidence.py ... --material-id walnut-wood --target-threshold 0.7` passed: confidence `0.856`; independent albedo, roughness, height, normal, and AO maps were written under `pbr-evidence/`.
8. `forge/stage1_intake/analyze_texture.py ... --material-id base --in-place` applied the `worn-composite` recipe to the starter material.
9. `forge/stage2_spec/validate_sculpt_spec.py ... --strict-quality` was executed and deliberately failed the unfilled starter spec. Its remaining gate failures are not hidden: it requires the blocked local-search pre-spec data, non-starter component hierarchy, and a rendered comparison review. No screenshot review was attempted or claimed.
