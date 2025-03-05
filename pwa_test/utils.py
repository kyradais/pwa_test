import frappe
import os
import shutil

def move_xml_to_private():
    """Move all XML files from app's private/views to site's private/views after migration."""
    site_path = frappe.get_site_path()
    source_dir = os.path.join(frappe.get_app_path("pwa_test"), "private", "views")
    dest_dir = os.path.join(site_path, "private", "views")

    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    if os.path.exists(source_dir):  # Ensure source directory exists
        for file_name in os.listdir(source_dir):
            if file_name.endswith(".xml"):  # Only move .xml files
                source_file = os.path.join(source_dir, file_name)
                dest_file = os.path.join(dest_dir, file_name)

                shutil.copy(source_file, dest_file)
                frappe.logger().info(f"Moved {file_name} to private directory")
