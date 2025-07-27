#!/bin/bash

echo "========================================"
echo "   Oltinsoy Xususiy Sanatoriyasi Admin Panel"
echo "   Statik IP Sozlash"
echo "========================================"
echo

echo "Statik IP sozlanmoqda..."
echo "IP: 192.168.1.100"
echo "Subnet: 255.255.255.0"
echo "Gateway: 192.168.1.1"
echo

# Network interface nomini topish
INTERFACE=$(ip route | grep default | awk '{print $5}' | head -1)

if [ -z "$INTERFACE" ]; then
    echo "❌ Network interface topilmadi!"
    exit 1
fi

echo "Network interface: $INTERFACE"
echo

# Statik IP sozlash
sudo ip addr add 192.168.1.100/24 dev $INTERFACE
sudo ip route add default via 192.168.1.1 dev $INTERFACE
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null

echo
echo "========================================"
echo "   Statik IP muvaffaqiyatli sozlandi!"
echo "========================================"
echo
echo "Server ishga tushirish uchun:"
echo "npm start"
echo
echo "Kirish manzillari:"
echo "- Local: http://localhost:3000"
echo "- Network: http://192.168.1.100:3000"
echo "- Admin: http://192.168.1.100:3000/admin"
echo
echo "Parol: admin1234"
echo 