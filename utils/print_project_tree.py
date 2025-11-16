


# File name: print_project_tree.py
# Location: root/utils/print_project_tree.py

"""
This script prints the tree of the project structure.
It only prints one example file from images/, gps/, and odometry/ folders.
"""

import os

# Directories to exclude entirely
exclude_dirs = {"node_modules", "venv", "__pycache__"}

# Base directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
images_dir = os.path.join(BASE_DIR, "ROS2", "ROS2_stream", "images")
gps_dir = os.path.join(BASE_DIR, "ROS2", "ROS2_stream", "gps")
odometry_dir = os.path.join(BASE_DIR, "ROS2", "ROS2_stream", "odometry")

# Directory for output txt files
output_dir = os.path.join(BASE_DIR, "utils")
os.makedirs(output_dir, exist_ok=True)


def write_tree(root, file, prefix=""):
    """
    Recursively write the folder structure starting from 'root' into 'file'.
    Prints only one example file from images, gps, and odometry directories.
    """
    entries = [e for e in os.listdir(root)
               if e not in exclude_dirs and not e.startswith('.')]
    entries.sort()

    # Flags to print only one sample file from each
    image_printed = False
    gps_printed = False
    odometry_printed = False

    for i, entry in enumerate(entries):
        path = os.path.join(root, entry)
        connector = "└── " if i == len(entries) - 1 else "├── "

        # --- Handle images ---
        if os.path.exists(images_dir) and os.path.commonpath([images_dir, path]) == images_dir:
            if entry.lower().endswith((".png", ".bin", ".msg", "jpg", "jpeg")):
                if image_printed:
                    continue
                image_printed = True

        # --- Handle GPS ---
        if os.path.exists(gps_dir) and os.path.commonpath([gps_dir, path]) == gps_dir:
            if entry.lower().endswith((".bin", ".msg", ".json")):
                if gps_printed:
                    continue
                gps_printed = True

        # --- Handle Odometry ---
        if os.path.exists(odometry_dir) and os.path.commonpath([odometry_dir, path]) == odometry_dir:
            if entry.lower().endswith((".bin", ".msg", ".json")):
                if odometry_printed:
                    continue
                odometry_printed = True

        file.write(f"{prefix}{connector}{entry}\n")

        if os.path.isdir(path):
            extension = "    " if i == len(entries) - 1 else "│   "
            write_tree(path, file, prefix + extension)


def create_tree_file(root_dir, output_file):
    """
    Create a tree file for the given root directory in Markdown format.
    Adds a header and wraps the tree in a bash code block for GitHub.
    """
    with open(output_file, "w", encoding="utf-8") as f:
        # --- Markdown header ---
        f.write(f"# Project Tree for '{root_dir}'\n\n")
        # --- Open bash code block ---
        f.write("```bash\n")
        f.write(".\n")

        folder_name = os.path.basename(os.path.normpath(root_dir))
        f.write(f"└── {folder_name}\n")

        write_tree(root_dir, f, prefix="    ")
        # --- Close bash code block ---
        f.write("```\n")

if __name__ == "__main__":
    # Define folders (absolute paths)
    folders_to_files = {
        os.path.join(BASE_DIR, "backend"): os.path.join(output_dir, "backend_tree.md"),
        os.path.join(BASE_DIR, "frontend"): os.path.join(output_dir, "frontend_tree.md"),
        os.path.join(BASE_DIR, "ROS2"): os.path.join(output_dir, "ROS2_tree.md"),
        BASE_DIR: os.path.join(output_dir, "project_tree.md"),
    }


    for folder, output_file in folders_to_files.items():
        if os.path.exists(folder):
            create_tree_file(folder, output_file)
            print(f"[INFO] Created {output_file} for folder '{folder}'")
        else:
            print(f"[WARN] Skipped '{folder}' — path not found.")
