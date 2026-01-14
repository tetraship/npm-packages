{
  description = "TStacks Development Environment";

  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; };

  outputs = { self, nixpkgs, ... }:
    let
      systems =
        [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in {
      formatter = forAllSystems
        (system: nixpkgs.legacyPackages.${system}.nixfmt-rfc-style);

      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
          };
        in {
          default = pkgs.mkShell {
            name = "npm-packages-shell";

            packages = with pkgs; [
              nodejs_24
              pnpm
              gemini-cli
              claude-code
            ];

            shellHook = ''
              echo "🚀 NPM Packages Development Shell Loaded"
              echo "----------------------------------------"
              echo "Node.js: $(node --version)"
              echo "----------------------------------------"
            '';
          };
        });
    };
}
