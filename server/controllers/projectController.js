import Project from "../models/projectModel.js";

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find().sort({ createdAt: -1 });

        if (allProjects.length === 0) {
            return res.status(400).json({ message: 'No project found.', allProjects });
        }

        return res.status(200).json({ message: 'All projects fetched successfully', allProjects });

    } catch (error) {
        console.error('Error while fetchinf all projects:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Get project detail
export const projectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({ project });

    } catch (error) {
        console.error('Error while fetching project detail:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// Create project
export const createProject = async (req, res) => {
    try {
        const{
            title,
            description,
            skills,
            duration,
            price,
            status,
        } = req.body;

        // Validate fields
        if (!title || !description || !skills || !duration || !price) {
            return res.status(400).json({ message: 'All fields are necessary' });
        }

        // Fetch company Id from request object
        const companyId = req.user._id;

        // Ensure only companies can post projects
        if (req.user.role !== 'Company') {
            return res.status(403).json({ message: 'Only companies can create projects' })
        }

        // Check if skills is an array
        if (!Array.isArray(skills)) {
            return res.status(400).json({ message: 'Skills must be an array' });
        }

        // Create new project
        const project = await Project.create({
            companyId,
            title,
            description,
            skills,
            duration,
            price,
            status,
        });

        return res.status(201).json({
            message: 'Project created successfully',
            project: {
                id: project._id,
                companyId: project.companyId,
                title: project.title,
                description: project.description,
                skills: project.skills,
                duration: project.duration,
                price: project.price,
                status: project.status,
                createdAt: project.createdAt,
            }
        })


    } catch (error) {
        console.error('Error while creating new project:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Update project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            skills,
            duration,
            price,
        } = req.body;

        // Validate fields
        if (!title || !description || !skills || !duration || !price) {
            return res.status(400).json({ message: 'All fields are necessary' });
        }

        // Ensure only companies can update projects
        if (req.user.role !== 'Company') {
            return res.status(403).json({ message: 'Only companies can update projects' })
        }

        // Check if project exists & belongs to the company
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (existingProject.companyId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update your own projects' });
        }

        // Check if skills is an array
        if (!Array.isArray(skills)) {
            return res.status(400).json({ message: 'Skills must be an array' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true },
        )

        return res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject
        })

    } catch (error) {
        console.error('Error while updating a project:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure only companies can update projects
        if (req.user.role !== 'Company') {
            return res.status(403).json({ message: 'Only companies can delete projects' })
        }

        // Check if project exists & belongs to the company
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (existingProject.companyId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own projects' });
        }

        // Delete project
        await Project.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Project deleted successfully' });

    } catch (error) {
        console.error('Error while deleting project:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}