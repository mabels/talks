require_relative "../core_net"

core_net = CoreNet.setup

def distil_single_malt(cn)
  cn.region.hosts.add("single-malt", "flavour" => "ubuntu") do |host|
    cn.region.interfaces.add_device(host, "lo", "mtu" => "9000",
             "address" => cn.region.network.addresses.add_ip(Construqt::Addresses::LOOOPBACK))
    host.configip = host.id ||= Construqt::HostId.create do |my|
      my.interfaces << cn.region.interfaces.add_device(host, "eth0", "mtu" => 1500,
                       "address" => cn.network.addresses.add_ip(Construqt::Addresses::DHCPV4))
    end
  end
end

distil_single_malt(core_net)

core_net.produce



