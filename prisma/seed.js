const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
    { userName: 'a', firstName: "A", lastName: "A", password, email: 'a@mail.com', mobile: "0" },
    { userName: 'b', firstName: "A", lastName: "A", password, email: 'b@mail.com', mobile: "1" },
    { userName: 'c', firstName: "A", lastName: "A", password, email: 'c@mail.com', mobile: "2" },
    { userName: 'd', firstName: "A", lastName: "A", password, email: 'd@mail.com', mobile: "3" },
    { userName: 'e', firstName: "A", lastName: "A", password, email: 'e@mail.com', mobile: "4" },
]

const courtData = [
    {
        "name": "manta",
        "mobile": "0",
        "ratePerHour": 200,
        "amountCourt": 10,
        "location": "https://maps.app.goo.gl/TtMHix89rCvXxjA3A"
    },
    {
        "name": "thong",
        "mobile": "0",
        "ratePerHour": 200,
        "amountCourt": 8,
    },
    {
        "name": "mirt sena",
        "mobile": "0",
        "ratePerHour": 200,
        "amountCourt": 6,
        "location": "https://maps.app.goo.gl/TtMHix89rCvXxjA3A"
    },
    {
        "name": "sena center",
        "mobile": "0",
        "ratePerHour": 180,
        "amountCourt": 16,
        "location": "https://maps.app.goo.gl/TtMHix89rCvXxjA3A"
    },
    {
        "name": "greenland",
        "mobile": "0",
        "ratePerHour": 240,
        "amountCourt": 4,
        "location": "https://maps.app.goo.gl/TtMHix89rCvXxjA3A"
    },
]

const run = async () => {
    await prisma.user.createMany({ data: userData })
    await prisma.court.createMany({ data: courtData })
}

run()
