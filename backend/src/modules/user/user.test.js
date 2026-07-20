import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { createApp } from '../../test/app.js';
import { connectTestDB, closeTestDB, clearTestDB } from '../../test/setup.js';
import User from '../../database/models/user/user.model.js';

const app = createApp();

describe('User API Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        process.env.JWT_SECRET = 'test_secret_key';
        await connectTestDB();
    });

    afterAll(async () => {
        await closeTestDB();
    });

    beforeEach(async () => {
        await clearTestDB();
        const user = await User.create({
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            profile: {
                displayName: 'Test User',
                bio: 'Original bio'
            }
        });
        userId = user._id;
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    });

    describe('GET /api/user/profile', () => {
        it('should get the user profile', async () => {
            const res = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.user.profile.displayName).toBe('Test User');
        });

        it('should return 401 if no token provided', async () => {
            const res = await request(app)
                .get('/api/user/profile');
            
            expect(res.status).toBe(401);
        });
    });

    describe('PATCH /api/user/profile/display-name', () => {
        it('should update display name', async () => {
            const res = await request(app)
                .patch('/api/user/profile/display-name')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    profile: { displayName: 'New Name' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.profile.displayName).toBe('New Name');
        });
    });

    describe('PATCH /api/user/profile/bio', () => {
        it('should update bio', async () => {
            const res = await request(app)
                .patch('/api/user/profile/bio')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    profile: { bio: 'New bio' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.profile.bio).toBe('New bio');
        });
    });

    describe('PATCH /api/user/career/target-role', () => {
        it('should update target role', async () => {
            const res = await request(app)
                .patch('/api/user/career/target-role')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: { targetRole: 'Software Engineer' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.targetRole).toBe('Software Engineer');
        });
    });

    describe('PATCH /api/user/career/skills', () => {
        it('should update skills', async () => {
            const res = await request(app)
                .patch('/api/user/career/skills')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: { skills: ['JavaScript', 'Node.js'] }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.skills).toEqual(expect.arrayContaining(['JavaScript', 'Node.js']));
        });
    });

    describe('Education Endpoints', () => {
        let educationId;

        it('should add education', async () => {
            const res = await request(app)
                .post('/api/user/career/education')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: {
                        education: {
                            institute: 'MIT',
                            degree: 'BSc Computer Science',
                            startDate: '2020-01-01',
                            currentlyStudying: true
                        }
                    }
                });
            
            expect(res.status).toBe(201);
            expect(res.body.user.career.education.length).toBe(1);
            expect(res.body.user.career.education[0].institute).toBe('MIT');
            
            educationId = res.body.user.career.education[0]._id;
        });

        it('should update education', async () => {
            // First add it manually to DB
            const user = await User.findById(userId);
            user.career.education.push({
                institute: 'MIT',
                degree: 'BSc CS'
            });
            await user.save();
            educationId = user.career.education[0]._id;

            const res = await request(app)
                .patch(`/api/user/career/education/${educationId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: {
                        education: {
                            degree: 'MSc Computer Science'
                        }
                    }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.education[0].degree).toBe('MSc Computer Science');
        });

        it('should delete education', async () => {
            // Add it manually
            const user = await User.findById(userId);
            user.career.education.push({
                institute: 'MIT',
                degree: 'BSc CS'
            });
            await user.save();
            educationId = user.career.education[0]._id;

            const res = await request(app)
                .delete(`/api/user/career/education/${educationId}`)
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.education.length).toBe(0);
        });
    });

    describe('Experience Endpoints', () => {
        let experienceId;

        it('should add experience', async () => {
            const res = await request(app)
                .post('/api/user/career/experience')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: {
                        experience: {
                            company: 'Google',
                            jobTitle: 'Software Engineer',
                            startDate: '2021-01-01',
                            currentlyWorking: true
                        }
                    }
                });
            
            expect(res.status).toBe(201);
            expect(res.body.user.career.experience.length).toBe(1);
            expect(res.body.user.career.experience[0].company).toBe('Google');
        });

        it('should update experience', async () => {
            const user = await User.findById(userId);
            user.career.experience.push({
                company: 'Google',
                jobTitle: 'SWE'
            });
            await user.save();
            experienceId = user.career.experience[0]._id;

            const res = await request(app)
                .patch(`/api/user/career/experience/${experienceId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    career: {
                        experience: {
                            jobTitle: 'Senior SWE'
                        }
                    }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.experience[0].jobTitle).toBe('Senior SWE');
        });

        it('should delete experience', async () => {
            const user = await User.findById(userId);
            user.career.experience.push({
                company: 'Google',
                jobTitle: 'SWE'
            });
            await user.save();
            experienceId = user.career.experience[0]._id;

            const res = await request(app)
                .delete(`/api/user/career/experience/${experienceId}`)
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.status).toBe(200);
            expect(res.body.user.career.experience.length).toBe(0);
        });
    });

    describe('Social Links Endpoints', () => {
        it('should update github link', async () => {
            const res = await request(app)
                .patch('/api/user/social/github')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    socialLinks: { github: 'https://github.com/test' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.socialLinks.github).toBe('https://github.com/test');
        });

        it('should update linkedin link', async () => {
            const res = await request(app)
                .patch('/api/user/social/linkedin')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    socialLinks: { linkedIn: 'https://linkedin.com/in/test' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.socialLinks.linkedIn).toBe('https://linkedin.com/in/test');
        });

        it('should update portfolio link', async () => {
            const res = await request(app)
                .patch('/api/user/social/portfolio')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    socialLinks: { portfolio: 'https://portfolio.test' }
                });
            
            expect(res.status).toBe(200);
            expect(res.body.user.socialLinks.portfolio).toBe('https://portfolio.test');
        });
    });
});
