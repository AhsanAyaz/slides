from setuptools import find_packages, setup

setup(
    name="sales_assistant_agent",
    version="0.1.0",
    packages=find_packages(where="agent"),
    package_dir={"": "agent"},
)
