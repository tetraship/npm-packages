# npm-packages

## Using as a Submodule

You can add this repository as a submodule to your project and symlink selected packages into your local packages directory.

### Adding the Submodule

To add this repository as a submodule in a `.submodules` folder:

```bash
# Create the .submodules directory if it doesn't exist
mkdir -p .submodules

# Add this repository as a submodule
git submodule add https://github.com/tetraship/npm-packages .submodules/npm-packages

# Initialize and update the submodule
git submodule update --init --recursive
```

### Symlinking Packages

To symlink selected packages from the submodule into your downstream project's `./packages/@tetraship` directory:

```bash
# Create the target directory if it doesn't exist
mkdir -p ./packages/@tetraship

# Symlink individual packages (replace <package-name> with the actual package name)
ln -s ../../../.submodules/npm-packages/<package-name> ./packages/@tetraship/<package-name>
```

For example, if you want to symlink a package named `utils`:

```bash
ln -s ../../../.submodules/npm-packages/utils ./packages/@tetraship/utils
```

### Updating the Submodule

To update the submodule to the latest version:

```bash
cd .submodules/npm-packages
git pull origin main
cd ../..
git add .submodules/npm-packages
git commit -m "Update npm-packages submodule"
```