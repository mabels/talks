require_relative "../core_net"


def distil_blended_scotch(cn)
  [300,301].each do |vlan|
    cn.region.hosts.add("blended-scotch-#{vlan}", "flavour" => "ubuntu") do |host|
      cn.region.interfaces.add_device(host, "lo", "mtu" => "9000", "address" =>
        cn.region.network.addresses.add_ip(Construqt::Addresses::LOOOPBACK))
      host.configip = host.id ||= Construqt::HostId.create do |my|
        my.interfaces << cn.region.interfaces.add_device(host, "eth0", "mtu" => 1500,
         "address" => cn.network.addresses.add_ip(Construqt::Addresses::DHCPV4))
      end
      cn.region.interfaces.add_device(host, "v#{vlan}", "mtu" => 1500, 'address' =>
        cn.region.network.addresses.add_ip("192.168.#{vlan%256}.1/24#INTERNAL-NET",
        "dhcp_range" => ["192.168.#{vlan%256}.100", "192.168.#{vlan%256}.200"]))
    end
  end
end

core_net = CoreNet.setup

distil_blended_scotch(core_net)

core_net.produce

