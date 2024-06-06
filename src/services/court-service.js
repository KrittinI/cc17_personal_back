const prisma = require("../models/prisma")

const courtService = {}

courtService.findExistCourt = (name) => prisma.court.findFirst({
    where: { name }
})

courtService.createCourt = (data) => prisma.court.create({
    data
})

courtService.findCourtById = (id) => prisma.court.findFirst({
    where: { id }
})

courtService.getAllCourt = () => prisma.court.findMany()
courtService.getCourtByPrice = (min, max) => prisma.court.findMany({
    where: {
        ratePerHour: {
            gte: min,
            lte: max
        }
    }
})

courtService.updateCourt = (id, data) => prisma.court.updateMany({
    where: { id },
    data
})

module.exports = courtService;