import frappe
import os

@frappe.whitelist()
def get_xml(file_name):
    if not frappe.session.user or frappe.session.user == "Guest":
        frappe.throw("Not authorized", frappe.PermissionError)

    # Construct full path to the XML file in private directory
    file_path = os.path.join(frappe.get_site_path(), "private", "views", file_name)

    # Debugging: Log the actual file path
    frappe.logger().info(f"Trying to access: {file_path}")

    if not os.path.exists(file_path):
        frappe.throw(f"File not found: {file_name}")

    with open(file_path, "r") as f:
        return f.read()
